# Supporters list

`update.mjs` counts the zaps that reached Vitor or Amethyst and writes
`src/data/supporters.json`, which the `/thanks` page ranks.

```bash
npm run supporters          # fetch what is new since the last run
npm run supporters -- --full  # recount everything from the relays (a few minutes)
```

Commit `state.json` and `src/data/supporters.json` together. `state.json` holds the
running totals per supporter, the posts whose zaps are split, the onchain transactions
and Cashu proofs already counted, and the receipt ids of the last 30 days. A run
re-reads those 30 days because relays such as Brainstorm add receipts late.

## What counts

| Zap | Counted when |
|---|---|
| Lightning (NIP-57, kind 9735) to Vitor or Amethyst | the receipt is signed by their own LNURL server: Alby, the server Vitor used in early 2023, or whatever their lightning address names today. Anyone can publish a receipt, so this drops forged ones. |
| Lightning on an Amethyst post with a zap split | the receipt pays someone in the split, and the zap request names that post and that person for the invoice's amount. Covers every Amethyst post and the release notes Vitor posted before the Amethyst account existed. |
| Onchain (NIP-BC, kind 8333) | the transaction is confirmed and pays the recipient's Taproot address. Each transaction counts once, for whoever claimed it first: anyone can claim a payment they did not make. |
| Cashu nutzap (NIP-61, kind 9321) | each proof is locked to the recipient's nutzap key and the mint reports it spent with the recipient's signature, so the recipient redeemed it. |

Not counted: zaps Vitor or Amethyst sent, a developer's share of their own zap, and
BOLT12 zaps (NIP-B1, kind 9736), whose payer proofs this script does not verify yet.
Private and anonymous zaps count toward the totals, without a name.

A split zap pays each recipient with its own receipt; those receipts count as one zap.
