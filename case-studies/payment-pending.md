# Practice Case Study: Payment Status Is Pending

**Type:** Simulated fintech support scenario  
**Category:** Payment operations / application support  
**Status:** Not resolved without confirmation from an authorised payment system

## Reported issue

A fictional user reports that a transaction still shows "Pending" in a dashboard.

## Questions to clarify

- What is the approved transaction reference?
- Approximately when was it initiated, including time zone if relevant?
- What status is shown in the authorised system?
- Is there a known incident or published processing window?

## Safe diagnostic sequence

1. Follow the company's required identity-verification procedure.
2. Request only the minimum approved reference and timestamp. Never request full card details, CVV, banking passwords, one-time codes or private keys.
3. Check the transaction in the authorised internal system and verify the current status.
4. Compare the status with documented processing windows and any official incident notice.
5. Record the timestamp, reference, confirmed status, checks performed and next owner.
6. Escalate conflicting statuses, suspected unauthorised activity, potential duplicate transactions or anything outside policy.

## Customer communication example

"Thanks for flagging this. I understand you'd like to confirm the status. I’m checking the transaction using our approved support process. Please do not send card details, passwords or verification codes in this chat. I’ll share an update once the status is confirmed in the authorised system."

## Important limitation

The example is a learning exercise only. It does not provide financial advice, guarantee settlement timing, or authorize refunds, payout changes or other transactions.
