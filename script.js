const revealItems=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12});
revealItems.forEach(el=>observer.observe(el));

const menuBtn=document.querySelector('.menu-btn');
const mobileNav=document.querySelector('.mobile-nav');
menuBtn?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('is-open');menuBtn.setAttribute('aria-expanded',String(open))});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('is-open');menuBtn?.setAttribute('aria-expanded','false')}));

const cases={
  'research-type':{index:'01 / RESEARCH SYSTEM',title:'研究类型识别：从模糊判断到可验证规则',body:`<h3>Problem</h3><p>研究类型判断依赖经验，边界不清，输出稳定性不足。</p><h3>What I did</h3><p>我把研究设计边界拆成关键词、优先级与过滤规则，再通过 Python 批量测试结果，定位误判类型并持续调整。</p><h3>Outcome</h3><p>相关模块判断准确率由约 50% 提升至 80%，同时沉淀出可复用的判断逻辑与测试方法。</p>`},
  'table-extraction':{index:'02 / DATA WORKFLOW',title:'复杂医学表格自动提取',body:`<h3>Problem</h3><p>不同文献中的复杂表格结构差异明显，人工整理成本高，也容易出现字段不一致。</p><h3>What I did</h3><p>我参与字段映射、提取规则和标准化输出格式设计，并通过结果核查持续修正规则。</p><h3>Outcome</h3><p>上线后数据提取效率提升约 25%，跨文献数据可以更稳定地进入后续分析流程。</p>`},
  'ai-skills':{index:'03 / AI WORKFLOW',title:'科研流程 AI Skill 化',body:`<h3>Problem</h3><p>科研流程步骤多、任务差异大，仅依靠 Prompt 很难稳定覆盖真实工作场景。</p><h3>What I did</h3><p>我把既有业务流程拆成可重复执行的 AI Skill，通过真实任务测试、错误归因、规则修正与再次验证建立测试闭环。</p><h3>Outcome</h3><p>累计完成 10+ 医学科研类 Skill 的测试与优化，覆盖文献过滤、研究类型判断、数据提取和结果标准化等任务。</p>`}
};
const modal=document.querySelector('.case-modal');
const openModal=id=>{const data=cases[id];if(!data||!modal)return;modal.querySelector('.modal-index').textContent=data.index;modal.querySelector('h2').textContent=data.title;modal.querySelector('.modal-body').innerHTML=data.body;modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
const closeModal=()=>{modal?.classList.remove('is-open');modal?.setAttribute('aria-hidden','true');document.body.style.overflow=''};
document.querySelectorAll('[data-case]').forEach(card=>{card.addEventListener('click',e=>{if(e.target.closest('button')||e.currentTarget===card)openModal(card.dataset.case)});card.addEventListener('keydown',e=>{if(e.key==='Enter')openModal(card.dataset.case)})});
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
