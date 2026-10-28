
import { useEffect, useState } from "react";

const API = "http://localhost:5000";

function ExchangeRequests() {
  const [tab, setTab] = useState("incoming");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function loadRequests(signal) {
    const token = sessionStorage.getItem("skillswap_token");

    if (!token) {
      throw new Error("Please log in to view requests.");
    }

    const response = await fetch(`${API}/api/exchanges`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not load requests.");
    }

    setRequests(data.exchanges || []);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function initialize() {
      try {
        setLoading(true);
        await loadRequests(controller.signal);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    initialize();
    return () => controller.abort();
  }, []);

  async function updateRequest(id, action) {
    const token = sessionStorage.getItem("skillswap_token");

    if (!token) {
      setError("Please log in again.");
      return;
    }

    setBusyId(id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `${API}/api/exchanges/${id}/${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Action failed.");
      }

      setNotice(data.message || "Request updated.");
      await loadRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  const visibleRequests = requests.filter((request) =>
    tab === "incoming"
      ? request.receiver?._id &&
        request.requester?._id
      : request.receiver?._id &&
        request.requester?._id
  );

  // Requests are already restricted to the logged-in user
  // by the backend. Determine direction from the current tab
  // using a dedicated API query instead.
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const token = sessionStorage.getItem("skillswap_token");

    if (!token) return;

    async function loadDirections() {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [inRes, outRes] = await Promise.all([
          fetch(`${API}/api/exchanges?type=incoming`, {
            headers,
            signal: controller.signal,
          }),
          fetch(`${API}/api/exchanges?type=outgoing`, {
            headers,
            signal: controller.signal,
          }),
        ]);

        if (!inRes.ok || !outRes.ok) {
          throw new Error("Unable to load request categories.");
        }

        const inData = await inRes.json();
        const outData = await outRes.json();

        setIncoming(inData.exchanges || []);
        setOutgoing(outData.exchanges || []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      }
    }

    loadDirections();

    return () => controller.abort();
  }, [requests]);

  const displayed =
    tab === "incoming" ? incoming : outgoing;

  return (
    <section className="exchange-requests-section">
      <div className="section-heading">
        <div>
          <h2>My Exchange Requests</h2>
          <p>Manage your skill swap requests.</p>
        </div>
      </div>

      <div className="request-tabs">
        <button
          className={tab === "incoming" ? "active" : ""}
          onClick={() => setTab("incoming")}
        >
          Received ({incoming.length})
        </button>

        <button
          className={tab === "outgoing" ? "active" : ""}
          onClick={() => setTab("outgoing")}
        >
          Sent ({outgoing.length})
        </button>
      </div>

      {error && <p className="requests-error" role="alert">{error}</p>}
      {notice && <p className="requests-notice" role="status">{notice}</p>}

      {loading ? (
        <p>Loading requests...</p>
      ) : displayed.length === 0 ? (
        <div className="requests-empty">
          No {tab === "incoming" ? "received" : "sent"} requests yet.
        </div>
      ) : (
        <div className="requests-list">
          {displayed.map((request) => {
            const otherStudent =
              tab === "incoming"
                ? request.requester
                : request.receiver;

            return (
              <div className="exchange-request-card" key={request._id}>
                <div>
                  <h3>{request.skill?.title || "Skill"}</h3>
                  <p>
                    {tab === "incoming" ? "From" : "To"}:{" "}
                    {otherStudent?.name || "Student"}
                  </p>

                  {request.message && (
                    <p className="request-message">
                      "{request.message}"
                    </p>
                  )}
                </div>

                <div className="request-card-actions">
                  <span className={`request-status status-${request.status}`}>
                    {request.status}
                  </span>

                  {request.status === "pending" &&
                    tab === "incoming" && (
                      <>
                        <button
                          disabled={busyId === request._id}
                          onClick={() =>
                            updateRequest(request._id, "accept")
                          }
                        >
                          Accept
                        </button>

                        <button
                          disabled={busyId === request._id}
                          onClick={() =>
                            updateRequest(request._id, "reject")
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                  {request.status === "pending" &&
                    tab === "outgoing" && (
                      <button
                        disabled={busyId === request._id}
                        onClick={() =>
                          updateRequest(request._id, "cancel")
                        }
                      >
                        Cancel Request
                      </button>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ExchangeRequests;
