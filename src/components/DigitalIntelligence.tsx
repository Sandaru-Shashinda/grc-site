import { Link } from "react-router-dom";
import { revealDelay } from "../hooks/useReveal";
import {
  digitalCapabilities,
  digitalInsights,
  SPECTRUM_RANGE,
  sampleHardness,
  sampleMatches,
  sampleMeasurements,
  spectrumBands,
  type CapabilityIcon,
  type MeasurementScale,
} from "../data/digital";
import "./DigitalIntelligence.css";

/** Position of a wavelength across the visible strip, as a percentage. */
function wavelengthOffset(nm: number) {
  const { min, max } = SPECTRUM_RANGE;
  return ((nm - min) / (max - min)) * 100;
}

/** Position of a measured value across its own track, as a percentage. */
function axisOffset(value: number, axis: MeasurementScale["axis"]) {
  return ((value - axis.min) / (axis.max - axis.min)) * 100;
}

const ICON_PATHS: Record<CapabilityIcon, string> = {
  // Linked stages — the workflow a stone moves through.
  chain: "M4 12h4m8 0h4M9.5 12a2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1-2.5-2.5Z",
  // Two readings set against each other.
  compare: "M12 4v16M7 8H3.5m3.5 0 2.5 5.5a3 3 0 0 1-5 0L7 8Zm10 0h3.5M17 8l2.5 5.5a3 3 0 0 1-5 0L17 8Z",
  // A ranked shortlist.
  match: "M4 7h9M4 12h13M4 17h6m7.5 1.5 3-3-3-3",
  // An absorption spectrum.
  spectrum: "M3 18V9m3.5 9V5m3.5 13v-6m3.5 6V7m3.5 11v-9m3.5 9v-4",
  // Outline detection over the stone.
  scan: "M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8m8 0h2.5A1.5 1.5 0 0 1 20 5.5V8m0 8v2.5a1.5 1.5 0 0 1-1.5 1.5H16m-8 0H5.5A1.5 1.5 0 0 1 4 18.5V16m8-5.5L14.5 14h-5L12 10.5Z",
  // A verified certificate.
  verify: "M12 3.5 5 6v5.5c0 4 2.9 7.7 7 9 4.1-1.3 7-5 7-9V6l-7-2.5Zm-3 8.2 2.2 2.3L15 9.8",
};

function CapabilityIconMark({ icon }: { icon: CapabilityIcon }) {
  return (
    <svg
      className="digital-card__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={ICON_PATHS[icon]} />
    </svg>
  );
}

export default function DigitalIntelligence() {
  return (
    <section className="section digital" id="digital-intelligence">
      <div className="container">
        {/* Heading ------------------------------------------------------- */}
        <header className="digital__head" data-reveal>
          <span className="eyebrow digital__eyebrow">Digital Intelligence</span>
          <h2 className="digital__title">The laboratory behind the certificate</h2>
          <p className="lead digital__lead">
            GRC runs on a gemological platform we built ourselves. Every stone is
            tracked, measured, cross-checked and photographed inside it — so the
            certificate you receive is the end of a recorded process, not a
            handwritten opinion.
          </p>
        </header>

        {/* Instrument readout + laboratory image -------------------------- */}
        <div className="digital__showcase">
          <div className="digital-readout" data-reveal>
            <div className="digital-readout__block">
              <h3 className="digital-readout__label">Measured properties</h3>
              <ul className="digital-scales">
                {sampleMeasurements.map((measurement) => {
                  const { axis, reference, reading } = measurement;
                  const isPoint = reading.min === reading.max;
                  return (
                    <li key={measurement.id} className="digital-scale">
                      <div className="digital-scale__head">
                        <span className="digital-scale__label">
                          {measurement.label}
                        </span>
                        <span className="digital-scale__value">
                          {measurement.display}
                        </span>
                      </div>
                      <div className="digital-scale__track" aria-hidden="true">
                        <span
                          className="digital-scale__band"
                          style={{
                            left: `${axisOffset(reference.min, axis)}%`,
                            width: `${
                              axisOffset(reference.max, axis) -
                              axisOffset(reference.min, axis)
                            }%`,
                          }}
                        />
                        {isPoint ? (
                          <span
                            className="digital-scale__tick"
                            style={{ left: `${axisOffset(reading.min, axis)}%` }}
                          />
                        ) : (
                          <span
                            className="digital-scale__span"
                            style={{
                              left: `${axisOffset(reading.min, axis)}%`,
                              width: `${
                                axisOffset(reading.max, axis) -
                                axisOffset(reading.min, axis)
                              }%`,
                            }}
                          />
                        )}
                      </div>
                      <div className="digital-scale__axis" aria-hidden="true">
                        <span>{measurement.axisLabels.min}</span>
                        <span>{measurement.axisLabels.max}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="digital-hardness">
                <span className="digital-scale__label">{sampleHardness.label}</span>
                <span className="digital-scale__value">
                  {sampleHardness.display}
                  <small>{sampleHardness.reference}</small>
                </span>
              </div>

              <p className="digital-readout__note">
                Each reading is set against the published range for the leading
                match — shown here as the gold band.
              </p>
            </div>

            <div className="digital-readout__block">
              <h3 className="digital-readout__label">Absorption spectrum</h3>
              <div className="digital-spectrum" aria-hidden="true">
                <div className="digital-spectrum__strip">
                  {spectrumBands.map((band) => (
                    <span
                      key={band.from}
                      className={`digital-spectrum__band is-${band.strength}`}
                      style={{
                        left: `${wavelengthOffset(band.from)}%`,
                        width: `${
                          wavelengthOffset(band.to) - wavelengthOffset(band.from)
                        }%`,
                      }}
                    />
                  ))}
                </div>
                <div className="digital-spectrum__scale">
                  <span>{SPECTRUM_RANGE.min} nm</span>
                  <span>{SPECTRUM_RANGE.max} nm</span>
                </div>
              </div>
              <p className="digital-readout__note">
                Absorption bands located by wavelength and graded strong, medium or
                weak.
              </p>
            </div>

            <div className="digital-readout__block">
              <h3 className="digital-readout__label">Reference match</h3>
              <ul className="digital-matches">
                {sampleMatches.map((match) => (
                  <li key={match.variety} className="digital-match">
                    <div className="digital-match__text">
                      <span className="digital-match__variety">{match.variety}</span>
                      <span className="digital-match__species">{match.species}</span>
                    </div>
                    <div className="digital-match__meter" aria-hidden="true">
                      <span style={{ width: `${match.score}%` }} />
                    </div>
                    <span className="digital-match__score">{match.score}%</span>
                  </li>
                ))}
              </ul>
              <p className="digital-readout__note">
                Candidate species ranked by how closely R.I., S.G. and hardness fit
                each reference.
              </p>
            </div>
          </div>

          <figure className="digital__figure" data-reveal style={revealDelay(120)}>
            <img
              src="/images/gem-laboratory-1.jpeg"
              alt="A GRC gemologist examining a gemstone under the laboratory microscope"
              loading="lazy"
            />
            <figcaption>
              Readings taken at the bench go straight into the stone&rsquo;s digital
              record.
            </figcaption>
          </figure>
        </div>

        {/* Capabilities --------------------------------------------------- */}
        <ul className="digital__grid">
          {digitalCapabilities.map((capability, index) => (
            <li
              key={capability.id}
              className="digital-card"
              data-reveal
              style={revealDelay((index % 3) * 90)}
            >
              <span className="digital-card__mark" aria-hidden="true">
                <CapabilityIconMark icon={capability.icon} />
              </span>
              <h3 className="digital-card__title">{capability.title}</h3>
              <p className="digital-card__body">{capability.body}</p>
            </li>
          ))}
        </ul>

        {/* Insights ------------------------------------------------------- */}
        <div className="digital__insights">
          <figure className="digital__figure digital__figure--wide" data-reveal>
            <img
              src="/images/lab-team.jpg"
              alt="The GRC laboratory team reviewing gemstone test results together"
              loading="lazy"
            />
          </figure>

          <div className="digital-insights__content" data-reveal style={revealDelay(120)}>
            <h3 className="digital-insights__title">What the data tells us</h3>
            <p className="digital-insights__intro">
              Because every examination is recorded, the laboratory can be measured.
              We review our own results continuously — it is how standards hold.
            </p>
            <dl className="digital-insights__list">
              {digitalInsights.map((insight) => (
                <div key={insight.id} className="digital-insight">
                  <dt>{insight.title}</dt>
                  <dd>{insight.body}</dd>
                </div>
              ))}
            </dl>
            <Link to="/verify-certificate" className="btn btn--primary">
              Verify a Certificate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
