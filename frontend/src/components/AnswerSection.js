import React from 'react';

/**
 * Answer-first block: one 40-80 word direct answer under a question-formatted
 * heading, then the supporting detail. Written so a quote taken from the top of
 * the block still makes sense out of context, which is how answer engines and
 * AI search extract pages.
 */
export default function AnswerSection({ heading, answer, specs = [], steps = [], table = null, as = 'section' }) {
  const Wrapper = as;

  return (
    <Wrapper className="ip-answer">
      <h2 className="svc-section-title">{heading}</h2>
      <p className="ip-answer__lede">{answer}</p>

      {steps.length > 0 && (
        <div className="ip-answer__block">
          <h3 className="ip-answer__sub">Step by step</h3>
          <ol className="ip-answer__steps">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {table && (
        <div className="ip-answer__block ip-answer__scroll">
          <table>
            <caption>{table.caption}</caption>
            <thead>
              <tr>
                {table.columns.map((column) => (
                  <th key={column} scope="col">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, index) => (
                    <td key={`${row.join('|')}-${index}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {specs.length > 0 && (
        <dl className="ip-answer__specs">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.text}</dd>
            </div>
          ))}
        </dl>
      )}
    </Wrapper>
  );
}
