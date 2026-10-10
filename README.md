# Ajnur Begovic — IT Support Portfolio

A static portfolio for entry-level IT Support, Technical Support and Application Support opportunities. The site includes an interactive help-desk practice lab with fictional tickets, troubleshooting playbooks and an incident-note builder.

**Transparency:** this is a self-directed learning portfolio. Tickets and case scenarios are fictional. It does not claim professional IT support experience or represent a production service-desk environment.

## Contents

- `index.html` — portfolio landing page
- `styles.css`, `script.js` — responsive site styles and menu behavior
- `projects/support-lab/` — interactive support lab (ticket queue simulator, troubleshooting playbooks, incident note builder)
- `case-studies/` — written, simulated troubleshooting examples

## Run locally

Open `index.html` in a browser. The interactive lab is linked from the portfolio; open `projects/support-lab/index.html` directly to test it. No build tools or dependencies are needed. Ticket data is stored in browser localStorage only.

## Publish as a separate GitHub Pages site

The existing developer portfolio lives in a separate repository. To publish this support portfolio without overwriting it:

1. Go to `https://github.com/new` while signed in to your GitHub account.
2. Create a **Public** repository named `ajnur-it-support-portfolio`. Do not add a README during repository creation.
3. On the empty repository page, choose **uploading an existing file**.
4. Open this extracted folder on your computer and upload its **contents** (the `index.html`, CSS/JS files and folders), not the ZIP and not the outer folder.
5. Commit the files to the `main` branch.
6. Open the new repository's **Settings → Pages**.
7. Under **Build and deployment**, choose **Deploy from a branch**, select branch `main` and folder `/ (root)`, then save.
8. Wait for the Pages build. The expected site URL is `https://ajnurdarned99.github.io/ajnur-it-support-portfolio/`.
9. Test the landing page and the HelpDesk Lab link on the public URL.

If a public link is added to a CV, open that exact URL in a private/incognito browser first to verify that it works without being signed in to GitHub.

## Privacy and safe support practices

- All built-in tickets are fictional. Do not enter real customer data, passwords, MFA codes, full payment-card details, banking credentials or private keys.
- Follow an employer's identity verification, access control and escalation procedures. Do not reset accounts, change payment details, or make production changes unless authorised.
- Never claim these simulated cases as professional work experience. They are practice examples to discuss honestly in interviews.

## Contact link
The “Email Ajnur” button opens Gmail compose in a browser. It works best when signed in to Gmail. The email address is included in the public portfolio, so use an address you are comfortable sharing with employers.
