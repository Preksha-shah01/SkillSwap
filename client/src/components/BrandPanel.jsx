export default function BrandPanel() {
  return (
    <section className="brand">
          <div className="logo">
            <span className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
                <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
                <line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="18" y1="16" x2="22" y2="16"/>
              </svg>
            </span>
            SkillSwap
          </div>
    
          <div className="brand-center">
            <div className="eyebrow">MADE FOR CAMPUS</div>
            <h2>Learn. Teach.<br />Swap skills.</h2>
            <p className="lead">Turn what you know into what you want to learnΓÇöone student connection at a time.</p>
          </div>
    
          <div className="illus" aria-hidden="true">
            <span className="tag-label t">Python</span>
            <span className="chip python">Python Γñì</span>
            <span className="chip uiux">UI/UX</span>
    
            <div className="dash top"></div>
            <div className="dash bottom"></div>
            <span className="arrow right">Γƒ╢</span>
            <span className="arrow left">Γƒ╡</span>
    
            <div className="circle a">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <div className="circle b">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <span className="badge a">A</span>
            <span className="badge b">B</span>
    
            <span className="chip react">React</span>
            <span className="chip aiml">AI/ML</span>
            <span className="tag-label b">UI/UX</span>
          </div>
    
          <div className="brand-foot">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            Built around what students can share
          </div>
        </section>
  );
}
