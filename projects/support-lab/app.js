(() => {
  const STORE_KEY = 'ajnurSupportLabTickets_v1';
  const sampleTickets = [
    { id: 'TKT-1042', title: 'Cannot connect to Wi-Fi', category: 'Connectivity', priority: 'High', status: 'Open', requester: 'User A (fictional)', description: 'Laptop is connected to Wi-Fi but websites will not load. Started this morning.', updated: 'Sample data' },
    { id: 'TKT-1043', title: 'Sign-in keeps failing', category: 'Account access', priority: 'Medium', status: 'In progress', requester: 'User B (fictional)', description: 'User reports an error after entering their username. Password and MFA codes must never be requested.', updated: 'Sample data' },
    { id: 'TKT-1044', title: 'Web app not loading', category: 'Application', priority: 'Low', status: 'Resolved', requester: 'User C (fictional)', description: 'Page displayed a blank screen. Browser restart restored expected behavior in this simulated example.', updated: 'Sample data' },
    { id: 'TKT-1045', title: 'Payment status still pending', category: 'Payment platform', priority: 'High', status: 'Open', requester: 'User D (fictional)', description: 'Payment dashboard shows pending status. No card or account details are included in this sample.', updated: 'Sample data' },
    { id: 'TKT-1046', title: 'Shared file opens read-only', category: 'Application', priority: 'Low', status: 'In progress', requester: 'User E (fictional)', description: 'User can view a file but cannot edit it. Need to verify access group and file location.', updated: 'Sample data' }
  ];
  const $ = (id) => document.getElementById(id);
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  let tickets;
  try { tickets = JSON.parse(localStorage.getItem(STORE_KEY)) || sampleTickets.map(t => ({...t})); } catch { tickets = sampleTickets.map(t => ({...t})); }
  if (!Array.isArray(tickets)) tickets = sampleTickets.map(t => ({...t}));
  const saveTickets = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(tickets)); } catch { /* demo continues in memory if storage is unavailable */ } };
  const statusClass = (status) => status === 'Resolved' ? 'status-resolved' : status === 'In progress' ? 'status-progress' : 'status-open';
  const priorityClass = (priority) => 'priority-' + priority.toLowerCase().replace(/\s+/g,'-');
  const renderTickets = () => {
    const search = $('ticketSearch').value.trim().toLowerCase();
    const status = $('statusFilter').value;
    const priority = $('priorityFilter').value;
    const shown = tickets.filter(t => {
      const haystack = `${t.id} ${t.title} ${t.category} ${t.requester} ${t.description}`.toLowerCase();
      return (!search || haystack.includes(search)) && (status === 'All' || t.status === status) && (priority === 'All' || t.priority === priority);
    });
    $('ticketRows').innerHTML = shown.map(t => `<tr>
      <td><div class="ticket-main"><span class="ticket-symbol">${escapeHTML(t.id.slice(-2))}</span><span><b>${escapeHTML(t.title)}</b><small>${escapeHTML(t.id)} · ${escapeHTML(t.description || 'No description provided')}</small></span></div></td>
      <td><span class="category-tag">${escapeHTML(t.category)}</span></td>
      <td><span class="priority-tag ${priorityClass(t.priority)}">${escapeHTML(t.priority)}</span></td>
      <td><select class="status-select ${statusClass(t.status)}" data-status-id="${escapeHTML(t.id)}" aria-label="Update status for ${escapeHTML(t.id)}"><option ${t.status==='Open'?'selected':''}>Open</option><option ${t.status==='In progress'?'selected':''}>In progress</option><option ${t.status==='Resolved'?'selected':''}>Resolved</option></select></td>
      <td><span class="requester-label">${escapeHTML(t.requester || 'Unassigned')}</span></td></tr>`).join('');
    $('emptyTickets').classList.toggle('hidden', shown.length > 0);
    $('allCount').textContent = tickets.length;
    $('openCount').textContent = tickets.filter(t => t.status === 'Open').length;
    $('progressCount').textContent = tickets.filter(t => t.status === 'In progress').length;
    $('resolvedCount').textContent = tickets.filter(t => t.status === 'Resolved').length;
  };
  const setPanelFromHash = () => {
    const hash = location.hash.replace('#','');
    const id = ['tickets','playbooks','note-builder'].includes(hash) ? hash : 'tickets';
    document.querySelectorAll('[data-panel]').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === id));
    document.querySelectorAll('[data-tab]').forEach(tab => { const active = tab.dataset.tab === id; tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active)); });
  };
  const showForm = (show) => $('newTicketForm').classList.toggle('hidden', !show);
  $('showFormBtn').addEventListener('click', () => { showForm(true); $('ticketTitle').focus(); });
  $('hideFormBtn').addEventListener('click', () => showForm(false));
  $('newTicketForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = $('ticketTitle').value.trim();
    const description = $('ticketDescription').value.trim();
    if (!title || !description) return;
    const nextNumber = Math.max(1046, ...tickets.map(t => Number(String(t.id).replace(/\D/g,'')) || 0)) + 1;
    tickets.unshift({ id: `TKT-${nextNumber}`, title, description, category: $('ticketCategory').value, priority: $('ticketPriority').value, requester: $('ticketRequester').value.trim() || 'Unassigned (fictional)', status: 'Open', updated: new Date().toLocaleDateString() });
    saveTickets(); renderTickets(); e.target.reset(); showForm(false);
    $('ticketSearch').value = ''; $('statusFilter').value = 'All'; $('priorityFilter').value = 'All';
  });
  $('ticketRows').addEventListener('change', (e) => {
    const id = e.target.dataset.statusId;
    if (!id) return;
    const ticket = tickets.find(t => t.id === id);
    if (ticket) { ticket.status = e.target.value; ticket.updated = new Date().toLocaleDateString(); saveTickets(); renderTickets(); }
  });
  ['ticketSearch','statusFilter','priorityFilter'].forEach(id => $(id).addEventListener(id === 'ticketSearch' ? 'input' : 'change', renderTickets));
  $('resetTickets').addEventListener('click', () => { if (confirm('Reset the practice queue to the original fictional sample tickets? Your added demo tickets will be removed.')) { tickets = sampleTickets.map(t => ({...t})); saveTickets(); renderTickets(); } });
  document.querySelectorAll('[data-tab]').forEach(tab => tab.addEventListener('click', () => { location.hash = tab.dataset.tab; setPanelFromHash(); }));
  window.addEventListener('hashchange', setPanelFromHash);

  const playbooks = {
    wifi: { title:'Wi-Fi / no internet', subtitle:'Connectivity · A single user reports that websites will not load.', severity:'Start at low risk', questions:['Does this affect one device or multiple users?','Is the device connected to the expected network?','Does the device show an IP address and a default gateway?'], steps:['Confirm scope: check whether other approved devices on the same network are affected.','Verify Wi-Fi is enabled and the device is connected to the correct network; do not ask the user to share network passwords.','Check whether other websites or approved services work and record the exact error and time.','If permitted by policy, disconnect/reconnect to the network and re-test one known site.','If basic checks fail, collect operating system, connection state and any approved diagnostic output for escalation.'], escalate:'Escalate if multiple users are affected, the network device appears down, no valid address is assigned, or changes would require administrator access. Do not reset shared infrastructure without authorisation.' },
    login: { title:"Can't sign in", subtitle:'Account access · A user cannot complete application sign-in.', severity:'Identity-safe process', questions:['What exact error appears (without exposing secret codes)?','Is this one application or multiple services?','Has the user confirmed the expected username and sign-in page?'], steps:['Confirm the user is on the legitimate company sign-in URL and capture the non-sensitive error text.','Check approved service-status information and determine whether others are affected.','Verify the account identifier using the organisation’s approved identity-verification process. Never ask for or record the password or one-time MFA code.','If policy allows, guide the user through the official password-reset or account-recovery flow.','Record the time, application, error code and actions attempted; request the identity team’s help when needed.'], escalate:'Escalate suspected compromise, repeated MFA prompts the user did not initiate, a locked account requiring admin action, or a possible phishing page. Never disable MFA just to bypass the problem.' },
    app: { title:'Web application will not load', subtitle:'Application · A web page is blank, slow or returns an error.', severity:'Reproduce before changing', questions:['What URL and page are affected?','Do other users or another approved browser see the same behavior?','Is there an error code or a recent service announcement?'], steps:['Capture the URL path (remove personal tokens), approximate timestamp, browser and exact visible error.','Check the approved status page or internal incident channel if available.','Try a new tab or refresh once; if permitted, test an approved alternate browser or private window. Avoid clearing data before considering whether it could remove useful local information.','Check whether the issue is account-specific, browser-specific or service-wide. Record which test changes the result.','Attach safe screenshots with sensitive data masked and send reproducible steps to the application team if unresolved.'], escalate:'Escalate broad impact, suspected data loss, access-control errors, recurring errors after standard checks, or anything requiring production/configuration changes.' },
    payment: { title:'Payment appears pending', subtitle:'Payments · A user says a payment or payout status has not updated.', severity:'Financial-data caution', questions:['Which transaction reference is approved for support use?','When was it initiated, with timezone?','Is the status pending, failed, reversed or completed in the official system?'], steps:['Use only the company-approved, access-controlled transaction tool and follow identity verification policy.','Ask for the transaction reference and approximate time only if permitted. Never request the full card number, CVV, banking password, one-time code or private key.','Check the official transaction status, known payment-rail processing windows and any service incident. Do not infer a final status from a screenshot alone.','Record what the authorised system shows, timestamp, reference and checks performed; avoid promising a completion time unless official guidance supports it.','Give the approved customer update and follow the documented escalation path if the payment is outside the stated processing window or has conflicting statuses.'], escalate:'Escalate suspected duplicate/unauthorised activity, conflicting status across systems, a payout outside policy timelines, or any request to bypass identity/security controls. Do not initiate refunds or change payee details without approved authorisation.' }
  };
  const renderPlaybook = (key) => {
    const p = playbooks[key] || playbooks.wifi;
    $('playbookDetail').innerHTML = `<div class="detail-top"><div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.subtitle)}</p></div><span class="severity">${escapeHTML(p.severity)}</span></div><h4>Clarifying questions</h4><div class="sample-questions">${p.questions.map(q=>`<span>${escapeHTML(q)}</span>`).join('')}</div><h4>Suggested check sequence</h4><ol>${p.steps.map(s=>`<li>${escapeHTML(s)}</li>`).join('')}</ol><div class="escalate"><b>When to escalate</b><p>${escapeHTML(p.escalate)}</p></div>`;
    document.querySelectorAll('[data-playbook]').forEach(btn => btn.classList.toggle('active', btn.dataset.playbook === key));
  };
  document.querySelectorAll('[data-playbook]').forEach(btn => btn.addEventListener('click', () => renderPlaybook(btn.dataset.playbook)));

  let lastGeneratedNote = '';
  $('noteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = id => $(id).value.trim();
    lastGeneratedNote = `INCIDENT SUMMARY\n${val('noteSummary')}\n\nIMPACT / SCOPE\n${val('noteImpact')}\n\nCHECKS PERFORMED\n${val('noteChecks')}\n\nFINDINGS / STATUS\n${val('noteFinding')}\n\nNEXT ACTION / OWNER\n${val('noteNext')}\n\nNOTE: Practice example. Verify facts and follow the organisation's approved workflow before using any real ticket.`;
    $('noteOutput').textContent = lastGeneratedNote;
    $('previewStatus').textContent = 'GENERATED';
    $('copyFeedback').textContent = 'Note generated. Review it for accuracy before using it.';
  });
  $('copyNoteBtn').addEventListener('click', async () => {
    if (!lastGeneratedNote) { $('copyFeedback').textContent = 'Generate a note first.'; return; }
    try { await navigator.clipboard.writeText(lastGeneratedNote); $('copyFeedback').textContent = 'Copied to clipboard.'; }
    catch { $('copyFeedback').textContent = 'Clipboard access unavailable. Select and copy the note manually.'; }
  });
  $('downloadNoteBtn').addEventListener('click', () => {
    if (!lastGeneratedNote) { $('copyFeedback').textContent = 'Generate a note first.'; return; }
    const blob = new Blob([lastGeneratedNote], {type:'text/plain;charset=utf-8'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'sample-incident-note.txt'; a.click(); URL.revokeObjectURL(url); $('copyFeedback').textContent = 'Downloaded sample-incident-note.txt.';
  });
  renderTickets(); renderPlaybook('wifi'); setPanelFromHash();
})();
