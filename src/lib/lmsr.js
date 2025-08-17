// LMSR (Logarithmic Market Scoring Rule)
// Cost C(q) = b * ln( exp(q_yes / b) + exp(q_no / b) )
// YES price: p_yes = exp(q_yes/b) / (exp(q_yes/b) + exp(q_no/b))
// We track share vectors q = { yes, no }

export function priceYes(q, b) {
  const ey = Math.exp(q.yes / b)
  const en = Math.exp(q.no / b)
  return ey / (ey + en)
}

export function priceNo(q, b) {
  return 1 - priceYes(q, b)
}

export function cost(q, b) {
  return b * Math.log(Math.exp(q.yes / b) + Math.exp(q.no / b))
}

// Buy delta YES shares (delta can be negative to "sell"/buy NO)
// Returns the new q vector and the exact spend (cost delta).
export function tradeYes(q, b, delta) {
  const before = cost(q, b)
  const after = cost({ yes: q.yes + delta, no: q.no }, b)
  const spend = after - before
  return { newQ: { yes: q.yes + delta, no: q.no }, spend }
}
