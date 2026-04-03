import React from "react";
import "../style.css";

const companies = [
  //  "https://via.placeholder.com/400",
  // "https://via.placeholder.com/400",
  // "https://via.placeholder.com/400",
  // "https://via.placeholder.com/400",
  // "https://via.placeholder.com/400",
  // "https://via.placeholder.com/400",
];

const alumni = [
  {
    name: "Dr. Debabrata Dash",
    details: "EE • 1995 • Head Human Resources (East)",
    company: "AMNS India",
    initials: "DD"
  },
  {
    name: "Sumit Deb",
    details: "ME • 1985 • Chairman-cum-MD",
    company: "NMDC",
    initials: "SD"
  },
  {
    name: "Mr. Susant Mallick",
    details: "EE • 1999 • Co-Founder & CEO",
    company: "CloudHub",
    initials: "SM"
  }
];

function Placements() {
  return (
    <div className="placementsPage">

      {/* Recruiters */}

      <section className="certificationSection">

        <h2 className="sectionTitle">RECRUITERS</h2>

        <div className="titleLine"></div>

        <p className="sectionSubtitle">
          Recognition of our commitment to excellence in education and placement services
        </p>

        <div className="companyGrid">
          {companies.map((logo, index) => (
            <div className="companyCard" key={index}>
              <img src={`/logos/${logo}`} alt="company logo" />
            </div>
          ))}
        </div>

      </section>
{/* ===== PLACEMENT STATS ===== */}

<section className="placementStats">

  <div className="statsWrapper">

    <div className="statsContainer">

      <div className="statsLeft">
        <h2>
          Shaping Leaders <br />
          Delivering Career <br />
          Excellence
        </h2>
      </div>

      <div className="statBox">
        <h3>₹2.5 Crore</h3>
        <p>Highest Salary Package</p>
      </div>

      <div className="statBox">
        <h3>₹14.97 Lakh</h3>
        <p>Top Percentile Package</p>
      </div>

      <div className="statBox">
        <h3>6,000+</h3>
        <p>Offers from Fortune 500 Companies</p>
      </div>

      <div className="statBox">
        <h3>2,225+</h3>
        <p>Recruiters</p>
      </div>

    </div>

  </div>

</section>

      {/* Alumni */}

      <section className="alumniSection">

        <h2 className="sectionTitle">NOTABLE ALUMNI</h2>

        <div style={{ overflow: "hidden", width: "100vw", marginLeft: "calc(50% - 50vw)" }}>

          <div
            style={{
              display: "flex",
              gap: "40px",
              width: "max-content",
              animation: "scrollAlumni 25s linear infinite",
              padding: "60px 0"
            }}
          >

            {[...alumni, ...alumni].map((a, index) => (

              <div
                className="alumniCard"
                key={index}
                style={{ minWidth: "320px", flexShrink: 0 }}
              >

                <div className="alumniImage">{a.initials}</div>

                <h3>{a.name}</h3>

                <p>{a.details}</p>

                <span>{a.company}</span>

              </div>

            ))}

          </div>

        </div>

      </section>

      <style>
        {`
        @keyframes scrollAlumni {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        `}
      </style>

    </div>
  );
}

export default Placements;