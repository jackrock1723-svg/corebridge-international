// CoreBridge V1 - no framework required.
// Configure Supabase in this file later when you are ready to connect the forms.
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

const qs = (s) => document.querySelector(s);

// Mobile navigation
const menu = qs('.menu');
if (menu) {
  menu.addEventListener('click', () => {
    const nav = document.querySelector('.nav nav');
    if (!nav) return;
    nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
    nav.style.position = 'absolute'; nav.style.top = '68px'; nav.style.left = '0'; nav.style.right = '0';
    nav.style.padding = '18px 4%'; nav.style.background = '#fff'; nav.style.borderBottom = '1px solid #dfe6ee'; nav.style.flexDirection = 'column'; nav.style.alignItems = 'flex-start';
  });
}

// Opportunity search on the static V1 page.
const search = qs('#jobSearch');
const type = qs('#jobType');
function filterJobs(){
  const cards = [...document.querySelectorAll('.job-card')];
  const q = (search?.value || '').toLowerCase();
  const t = (type?.value || '').toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const okQ = !q || card.dataset.search.includes(q);
    const okT = !t || card.dataset.search.includes(t);
    card.style.display = okQ && okT ? 'flex' : 'none';
    if(okQ && okT) visible++;
  });
  const empty = qs('#noJobs'); if(empty) empty.classList.toggle('hidden', visible !== 0);
}
search?.addEventListener('input', filterJobs); type?.addEventListener('change', filterJobs);

const params = new URLSearchParams(location.search);
const opportunityId = qs('#opportunityId');
if (opportunityId && params.get('job')) opportunityId.value = params.get('job');

async function submitToSupabase(table, data, statusEl) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    localStorage.setItem(`corebridge_${table}_last`, JSON.stringify({data, created_at:new Date().toISOString()}));
    statusEl.textContent = 'Demo mode: the form is working locally. Connect Supabase in js/site.js to save submissions online.';
    return;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method:'POST', headers:{'Content-Type':'application/json','apikey':SUPABASE_ANON_KEY,'Authorization':`Bearer ${SUPABASE_ANON_KEY}`,'Prefer':'return=minimal'}, body:JSON.stringify(data)
    });
    if(!res.ok) throw new Error(await res.text());
    statusEl.textContent = 'Thank you. Your submission has been received.';
  } catch (e) {
    console.error(e); statusEl.textContent = 'We could not submit this online yet. Please try again after the database connection is configured.';
  }
}

function wireForm(id, table, statusId){
  const form = qs(`#${id}`); if(!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const status = qs(`#${statusId}`); status.textContent = 'Sending...';
    const data = Object.fromEntries(new FormData(form).entries());
    await submitToSupabase(table, data, status);
    if(SUPABASE_URL && SUPABASE_ANON_KEY) form.reset();
  });
}
wireForm('candidateForm','candidate_applications','formStatus');
wireForm('partnerForm','partner_inquiries','partnerStatus');
wireForm('businessForm','business_inquiries','businessStatus');
wireForm('contactForm','contact_messages','contactStatus');
