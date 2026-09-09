const menuBtn=document.querySelector('.menu-btn');
const mobileNav=document.querySelector('.mobile-nav');
menuBtn?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}})},{threshold:.12,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const pathLine=document.querySelector('.path-line');
if(pathLine){new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('animate')}),{threshold:.4}).observe(pathLine)}

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.desktop-nav a')];
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}})},{rootMargin:'-42% 0px -48% 0px'});
sections.forEach(s=>sectionObserver.observe(s));

const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{if(!glow)return;glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';},{passive:true});

const cases={
  'research-type':{kicker:'01 / RESEARCH SYSTEM',title:'研究类型识别：从模糊判断到可验证规则',html:`<h3>Problem</h3><p>研究类型判断存在大量边界情况，单靠人工经验难以形成稳定、一致、可批量验证的输出。</p><h3>What I did</h3><ul><li>拆解研究设计边界与高频误判场景</li><li>构建关键词规则与优先级策略</li><li>通过 Python 脚本批量测试结果</li><li>对误判样本做问题归因并持续修正规则</li></ul><h3>Outcome</h3><p>相关模块上线后，研究类型判断准确率由约 50% 提升至 80%。</p>`},
  'table-extraction':{kicker:'02 / DATA WORKFLOW',title:'复杂医学表格自动提取',html:`<h3>Problem</h3><p>不同文献中的表格结构、字段命名和数据口径不一致，人工整理重复且容易产生格式差异。</p><h3>What I did</h3><ul><li>参与字段映射和提取规则设计</li><li>明确标准化输出格式</li><li>针对异常结果进行核查与反馈</li><li>支持跨文献数据进入统一分析表</li></ul><h3>Outcome</h3><p>方案上线后，数据提取效率提升约 25%。</p>`},
  'ai-skills':{kicker:'03 / AI WORKFLOW',title:'科研流程 AI Skill 化',html:`<h3>Problem</h3><p>既有科研流程要交给 AI 执行，不能只看“能否生成结果”，还需要明确规则、测试真实任务，并判断错误来自哪里。</p><h3>What I did</h3><ul><li>把业务流程拆成可重复执行的 Skill</li><li>使用真实科研任务进行测试</li><li>记录错误类型并进行问题归因</li><li>根据结果迭代 Prompt、规则和输出标准</li></ul><h3>Outcome</h3><p>累计完成 10+ 医学科研类 AI Skill 的测试、问题归因与优化。</p>`}
};
const drawer=document.querySelector('.case-drawer');
const title=document.querySelector('#drawer-title');
const kicker=document.querySelector('#drawer-kicker');
const body=document.querySelector('#drawer-body');
function openCase(key){const data=cases[key];if(!data||!drawer)return;kicker.textContent=data.kicker;title.textContent=data.title;body.innerHTML=data.html;drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('drawer-open');document.querySelector('.drawer-close')?.focus();}
function closeCase(){drawer?.classList.remove('open');drawer?.setAttribute('aria-hidden','true');document.body.classList.remove('drawer-open');}
document.querySelectorAll('[data-case]').forEach(card=>{card.addEventListener('click',()=>openCase(card.dataset.case));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openCase(card.dataset.case);}})});
document.querySelector('.drawer-close')?.addEventListener('click',closeCase);
document.querySelector('.drawer-backdrop')?.addEventListener('click',closeCase);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCase();});