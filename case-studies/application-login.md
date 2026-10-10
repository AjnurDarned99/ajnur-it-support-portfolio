# Practice Case Study: Application Sign-in Fails

**Type:** Simulated troubleshooting exercise  
**Category:** Account access  
**Status:** Escalate if the approved recovery steps do not restore access

## Reported issue

A fictional user cannot complete sign-in to a web application and sees an error after submitting their username.

## Questions to clarify

- What non-sensitive error text or error code appears?
- Is the issue limited to one application or multiple company services?
- Is there an approved service-status notice?
- Is the user at the legitimate company sign-in URL?

## Safe diagnostic sequence

1. Capture the application name, timestamp, browser and exact non-sensitive error.
2. Check approved status information and whether the problem affects other users.
3. Verify the account identifier only using the organisation's approved identity-verification process.
4. If policy permits, guide the user to the official recovery workflow.
5. Record the actions attempted and the outcome; escalate when admin access or an identity-team action is required.

## Security boundaries

Never ask for passwords, MFA codes, recovery codes or session tokens. Do not disable MFA to bypass a sign-in problem. Escalate unexpected MFA prompts, suspected phishing or possible account compromise immediately through the approved process.

## Handoff example

"User A cannot complete sign-in to the [fictional application]. Error displayed: [non-sensitive error]. Began at [time/time zone]. Checked approved service status and reproduced the error in [browser]. No credentials or MFA codes were requested or recorded. Next action: identity/application team to review the error reference [reference]."
