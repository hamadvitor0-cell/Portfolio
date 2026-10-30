import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.QA_URL||'http://127.0.0.1:3010';
const production=process.env.QA_PRODUCTION==='1';
assert.ok(['localhost','127.0.0.1',...(production?['www.vitorhamad.me']:[])].includes(new URL(base).hostname));
const folder=`artifacts/project-journey${production?'-production':''}`;
await mkdir(folder,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const contexts=[],errors=[],results=[];
const names={mordida:'MORDIDA!',fatia12:'FATIA 12',corte14:'Corte 14'};
async function setup(options={},path='') {
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference',...options});contexts.push(context);
  await context.route('**/api/analytics',r=>r.fulfill({status:200,contentType:'application/json',body:'{}'}));
  await context.route('**/_vercel/insights/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
  await context.route('**/api/contact',()=>{throw Error('Journey QA never submits leads')});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push({message:m.text(),location:m.location()})});
  const response=await page.goto(base+path,{waitUntil:'networkidle'});assert.equal(response.status(),200);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('#home img')].filter(i=>i.loading==='eager').map(i=>i.decode()));await Promise.all(document.querySelector('#home').getAnimations({subtree:true}).filter(a=>a.effect.getComputedTiming().iterations!==Infinity).map(a=>a.finished.catch(()=>{})))});
  return page;
}
async function progress(page,t) {
  for(let pass=0;pass<2;pass++) {
    await page.evaluate(t=>{const r=document.querySelector('#home').getBoundingClientRect(),top=r.top+scrollY,start=top-76,end=top+r.height-innerHeight;scrollTo({top:Math.max(0,start+(end-start)*t),behavior:'instant'})},t);
    await page.waitForTimeout(280);
  }
}
async function point(control) {
  return control.evaluate(b=>{const r=b.getBoundingClientRect();for(const radius of [20,12,0])for(let y=Math.max(100,r.top+22);y<Math.min(innerHeight-10,r.bottom-15);y+=10)for(let x=Math.max(10,r.left+22);x<Math.min(innerWidth-10,r.right-15);x+=10)if([[0,0],[-radius,-radius],[radius,radius]].every(([dx,dy])=>b.contains(document.elementFromPoint(x+dx,y+dy))))return{x,y};return null});
}
async function highlight(page,id,key) {
  const control=page.getByRole('button',{name:`Destacar projeto ${names[id]}`,exact:true});
  if(key){await control.focus();await page.keyboard.press('ArrowRight');assert.equal(await control.evaluate(e=>e.matches(':focus-visible')),true);await page.keyboard.press(key)}
  else {
    let valid=false;
    for(let i=0;i<3;i++){const p=await point(control);assert.ok(p,`Exposed selection target ${id}`);await page.mouse.move(p.x,p.y);await page.waitForTimeout(350);valid=await control.evaluate((e,p)=>e.contains(document.elementFromPoint(p.x,p.y)),p);if(valid)break}
    assert.ok(valid);await page.mouse.down();await page.mouse.up();await page.mouse.move(20,90);
  }
  await page.waitForTimeout(700);assert.equal(await control.getAttribute('aria-pressed'),'true');
}
async function gallery(page) {
  assert.equal(await page.locator('.journey-project').count(),3);
  assert.deepEqual(await page.locator('.journey-project h3').evaluateAll(es=>es.map(e=>e.getAttribute('aria-label'))),['Corte 14 — Barber Club','FATIA 12 — Pizza Studio','MORDIDA! — Smash House']);
  assert.equal(await page.locator('.journey-showcase .journey-select:not(:disabled)').count(),0);
  for(const id of ['corte14','fatia12','mordida'])assert.equal(await page.locator(`.${id}-project .journey-preview-link`).getAttribute('href'),`/cases/${id}`);
  assert.equal(await page.locator('.journey-project a[target="_blank"]').count(),0);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
}
try {
  const page=await setup();
  await page.locator('#home[data-cinematic="true"]').waitFor();
  assert.equal(await page.locator('.journey-select[aria-pressed="true"]').getAttribute('data-journey-control'),'mordida');
  assert.equal(await page.locator('.studio-showroom').count(),0);
  assert.equal(await page.locator('#home').evaluate(e=>e.nextElementSibling.id),'case-principal');
  await highlight(page,'fatia12');await highlight(page,'corte14');await highlight(page,'mordida');
  const scenePoint=await point(page.getByRole('button',{name:'Destacar projeto MORDIDA!',exact:true}));
  await page.mouse.move(scenePoint.x,scenePoint.y);await page.waitForTimeout(700);
  const angles=style=>[...style.matchAll(/rotate[XY]\((-?[\d.]+)deg\)/g)].map(match=>Math.abs(Number(match[1])));
  const moved=angles(await page.locator('.journey-grid').getAttribute('style'));
  assert.ok(moved.some(angle=>angle>.5)&&moved.every(angle=>angle<=6),'Restrained mouse parallax remains active in the hero');
  await page.mouse.move(20,90);await page.waitForTimeout(1000);
  assert.ok(angles(await page.locator('.journey-grid').getAttribute('style')).every(angle=>angle<.3),'Pointer leave returns toward the resting pose');
  results.push('desktop mouse parallax and smooth return remain active before assembly');
  const initialURL=page.url();
  await page.evaluate(()=>{window.journeyImages=[...document.querySelectorAll('.journey-window img')]});
  const captures=[];
  for(const t of [0,.2,.4,.6,.8,1]) {
    await progress(page,t);
    assert.equal(page.url(),initialURL,'Scroll and selection do not navigate');
    const state=await page.evaluate(()=>({phase:document.querySelector('#home')?.dataset.phase,opacity:getComputedStyle(document.querySelector('.journey-hero-content')).opacity,visibility:getComputedStyle(document.querySelector('.journey-hero-content')).visibility,inert:document.querySelector('.journey-hero-content').inert,background:getComputedStyle(document.querySelector('#home')).backgroundColor,sameImages:window.journeyImages.every((node,i)=>node===document.querySelectorAll('.journey-window img')[i]&&node.naturalWidth>0),width:innerWidth,frames:[...document.querySelectorAll('.journey-window')].map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,right:r.right}})}));
    assert.equal(state.sameImages,true,'The same loaded image nodes are retained throughout the timeline');
    assert.ok(state.frames.every(frame=>frame.width<state.width*.46),'No project expands to fill the viewport');
    if(t>=.4){assert.equal(state.opacity,'0');assert.equal(state.visibility,'hidden');assert.equal(state.inert,true)}
    if(t===1){assert.equal(state.phase,'gallery');assert.equal(state.background,'rgb(8, 15, 30)');for(let i=1;i<3;i++){assert.ok(state.frames[i].x-state.frames[i-1].right>=20);assert.ok(Math.abs(state.frames[i].y-state.frames[0].y)<1)}await gallery(page)}
    await page.screenshot({path:`${folder}/scroll-${t*100}.png`});captures.push({progress:t,...state});
  }
  results.push('six scroll stages; identical image nodes; complete hero disappearance; balanced final columns; no giant preview');
  await progress(page,0);await highlight(page,'fatia12','Enter');
  await progress(page,.6);
  assert.equal(await page.locator('.hero-stage').evaluate(e=>e===document.activeElement),true,'Focus leaves the disabled selection layer');
  await progress(page,1);
  assert.equal(await page.locator('.fatia12-project .journey-preview-link').evaluate(e=>e===document.activeElement),true,'Focus follows the same project into its case link');
  await progress(page,.6);await progress(page,0);
  assert.equal(await page.getByRole('button',{name:'Destacar projeto FATIA 12',exact:true}).getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('.journey-hero-content').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await page.locator('#home').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(16, 28, 54)');
  await highlight(page,'corte14','Space');await highlight(page,'mordida','Enter');
  for(const id of ['fatia12','corte14','mordida','corte14']){await page.getByRole('button',{name:`Destacar projeto ${names[id]}`,exact:true}).focus();await page.keyboard.press('Enter');await page.waitForTimeout(40)}
  await page.waitForTimeout(700);
  await progress(page,1);await progress(page,0);
  assert.equal(await page.getByRole('button',{name:'Destacar projeto Corte 14',exact:true}).getAttribute('aria-pressed'),'true');
  await page.locator('.studio-hero-actions a[href="#cases"]').focus();await progress(page,.6);
  assert.equal(await page.locator('.journey-hero-content').evaluate(e=>e.contains(document.activeElement)),false,'Focus never keeps hidden hero buttons visible');
  await progress(page,1);assert.equal(await page.locator('.journey-hero-content').evaluate(e=>getComputedStyle(e).opacity),'0');
  results.push('reversible selection, Enter/Space, rapid changes and focus handoff without focus-within leakage');

  await progress(page,0);
  await page.getByRole('button',{name:'Destacar projeto MORDIDA!',exact:true}).focus();await page.keyboard.press('Tab');
  await page.waitForFunction(()=>document.querySelector('#home')?.dataset.phase==='gallery');
  await page.waitForFunction(()=>document.activeElement?.classList.contains('journey-preview-link'));
  assert.equal(await page.locator('.corte14-project .journey-preview-link').evaluate(e=>e===document.activeElement),true);
  await page.keyboard.press('Shift+Tab');await page.waitForFunction(()=>document.querySelector('#home')?.dataset.phase==='hero');
  await page.waitForFunction(()=>document.activeElement?.matches('.journey-select[data-journey-control="mordida"]'));
  results.push('Tab advances from selection to gallery; Shift+Tab reverses the journey without skipping or trapping focus');
  await progress(page,0);await page.locator('.studio-hero-actions a[href="#cases"]').click();await page.waitForURL('**/#cases');
  await page.waitForFunction(()=>document.querySelector('#home')?.dataset.phase==='gallery');
  for(const id of ['fatia12','corte14','mordida']) {
    await page.locator(`.${id}-project .journey-preview-link`).click();await page.waitForURL(`**/cases/${id}`);
    assert.match(await page.title(),new RegExp(id==='mordida'?'MORDIDA':id==='fatia12'?'FATIA 12':'Corte 14','i'));
    await page.goBack({waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('#home')?.dataset.phase==='gallery');
  }
  await page.goto(base+'/#cases',{waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('#home')?.dataset.phase==='gallery');
  const header=page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'Projetos',exact:true});
  await progress(page,0);await header.click();await page.waitForFunction(()=>document.querySelector('#home')?.dataset.phase==='gallery');
  results.push('hero CTA, navbar, direct #cases, all three preview links and browser Back land in the complete gallery');

  for(const [width,h] of production?[[390,844],[1440,1000]]:[[320,844],[360,844],[375,844],[390,844],[430,844],[768,1000],[1024,1000],[1100,760],[1440,780],[1440,1000],[1920,1000]]) {
    await page.setViewportSize({width,height:h});await page.goto(base+'/#cases',{waitUntil:'networkidle'});await page.waitForTimeout(350);await gallery(page);
    const cinematic=await page.locator('#home').getAttribute('data-cinematic')==='true';
    if(cinematic){await page.waitForFunction(()=>document.querySelector('#home')?.dataset.phase==='gallery');const bottoms=await page.locator('.journey-project-info .text-link').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().bottom));assert.ok(bottoms.every(bottom=>bottom<=h+1),`Descriptions and actions fit at ${width}x${h}`)}
    else {assert.equal(await page.locator('.hero-stage').evaluate(e=>getComputedStyle(e).position),'relative');const boxes=await page.locator('.journey-project').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return{top:r.top,bottom:r.bottom}}));if(width<768)for(let i=1;i<3;i++)assert.ok(boxes[i].top>=boxes[i-1].bottom,'Mobile gallery flows vertically')}
    assert.equal(await page.locator('[id="cases"]').count(),1);
    if([390,768,1440,1920].includes(width)) {await page.screenshot({path:`${folder}/gallery-${width}-${h}.png`});if(width===390)await page.locator('.journey-showcase').screenshot({path:`${folder}/mobile-gallery.png`,style:'.site-header,.reading-progress{visibility:hidden!important}'})}
    results.push(`gallery layout and direct anchor ${width}x${h}`);console.log(`PASS gallery ${width}x${h}`);
  }
  const touch=await setup({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  for(const id of ['fatia12','corte14','mordida']){const control=touch.getByRole('button',{name:`Destacar projeto ${names[id]}`,exact:true}),p=await point(control);assert.ok(p);await touch.touchscreen.tap(p.x,p.y);await touch.waitForTimeout(700);assert.equal(await control.getAttribute('aria-pressed'),'true')}
  await touch.locator('.studio-hero-actions a[href="#cases"]').click();await touch.waitForURL('**/#cases');await gallery(touch);
  results.push('compact hero touch selection and readable vertical gallery without sticky scrolling');
  const reduced=await setup({reducedMotion:'reduce'},'/#cases');
  assert.equal(await reduced.locator('#home').getAttribute('data-cinematic'),'false');await gallery(reduced);
  await reduced.locator('.fatia12-project .journey-project-info .text-link').click();await reduced.waitForURL('**/cases/fatia12');
  const nojs=await setup({javaScriptEnabled:false,reducedMotion:'reduce',viewport:{width:390,height:844}},'/#cases');await gallery(nojs);
  await nojs.locator('.mordida-project .journey-project-info .text-link').click();await nojs.waitForURL('**/cases/mordida');
  results.push('complete static gallery with reduced motion and without JavaScript');
  assert.deepEqual(errors,[],'No console, hydration or runtime errors');
  await writeFile(`${folder}/verification.json`,JSON.stringify({status:'passed',checkedAt:new Date().toISOString(),base,results,captures,errors,realLeadsSent:0},null,2));
  console.log(`PASS journey: ${results.length} checks and six captured scroll stages.`);
} finally {for(const context of contexts)await context.close();await browser.close()}
