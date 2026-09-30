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
    <Wrapper style={{ maxWidth: '900px', margin: '0 auto 3rem auto' }}>
      <div
        className="corporate-card"
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '2rem 2rem 2.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.6rem',
          lineHeight: 1.3,
          color: '#0b0f19',
          margin: '0 0 0.85rem'
        }}>
          {heading}
        </h2>

        <p style={{
          fontSize: '1.05rem',
          lineHeight: 1.7,
          color: '#334155',
          margin: 0,
          fontWeight: 500
        }}>
          {answer}
        </p>

        {steps.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{
              fontSize: '1.05rem',
              color: '#0b0f19',
              margin: '0 0 0.75rem',
              fontFamily: 'var(--font-heading)'
            }}>
              Step by step
            </h3>
            <ol style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.7 }}>
              {steps.map((step) => (
                <li key={step} style={{ marginBottom: '0.4rem' }}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {table && (
          <div style={{ marginTop: '2rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
              <caption style={{
                textAlign: 'left',
                fontWeight: 700,
                color: '#0b0f19',
                paddingBottom: '0.6rem',
                captionSide: 'top'
              }}>
                {table.caption}
              </caption>
              <thead>
                <tr>
                  {table.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      style={{
                        textAlign: 'left',
                        padding: '0.55rem 0.75rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#0b0f19',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row.join('|')}>
                    {row.map((cell, index) => (
                      <td
                        key={`${row.join('|')}-${index}`}
                        style={{
                          padding: '0.55rem 0.75rem',
                          border: '1px solid #e2e8f0',
                          color: index === 0 ? '#0b0f19' : '#475569',
                          fontWeight: index === 0 ? 600 : 500,
                          whiteSpace: index === 0 ? 'normal' : 'nowrap'
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {specs.length > 0 && (
          <dl style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.35rem 2rem',
            margin: '2rem 0 0'
          }}>
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt style={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  color: '#1d4ed8',
                  marginBottom: '0.35rem'
                }}>
                  {spec.label}
                </dt>
                <dd style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.65, color: '#475569' }}>
                  {spec.text}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Wrapper>
  );
}
