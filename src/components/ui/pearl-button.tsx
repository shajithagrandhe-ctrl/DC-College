import React from "react";

type PearlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

export function PearlButtonStyles() {
  return (
    <style>{`
      .pearl-button {
        --pearl-white: #ffe7ff;
        --pearl-bg: rgba(8, 8, 8, 0.54);
        --pearl-radius: 100px;
        outline: none;
        cursor: pointer;
        border: 0;
        position: relative;
        display: inline-flex;
        align-items: center;
        border-radius: var(--pearl-radius);
        background-color: var(--pearl-bg);
        transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        box-shadow:
          inset 0 0.18rem 0.5rem rgba(255, 255, 255, 0.22),
          inset 0 -0.08rem 0.22rem rgba(0, 0, 0, 0.65),
          inset 0 -0.24rem 0.58rem rgba(255, 255, 255, 0.2),
          0 0.7rem 1.15rem rgba(0, 0, 0, 0.18);
      }

      .pearl-button .wrap {
        color: rgba(255, 255, 255, 0.86);
        border-radius: inherit;
        position: relative;
        overflow: hidden;
      }

      .pearl-button .wrap p span:nth-child(2) {
        display: none;
      }

      .pearl-button:hover .wrap p span:nth-child(1),
      .pearl-button.active .wrap p span:nth-child(1) {
        display: none;
      }

      .pearl-button:hover .wrap p span:nth-child(2),
      .pearl-button.active .wrap p span:nth-child(2) {
        display: inline-block;
      }

      .pearl-button .wrap p {
        display: flex;
        align-items: center;
        gap: 0.38rem;
        margin: 0;
        transition: transform 0.2s ease;
        transform: translateY(2%);
        -webkit-mask-image: linear-gradient(to bottom, white 48%, rgba(255, 255, 255, 0.42));
        mask-image: linear-gradient(to bottom, white 48%, rgba(255, 255, 255, 0.42));
      }

      .pearl-button .wrap::before,
      .pearl-button .wrap::after {
        content: "";
        position: absolute;
        transition: transform 0.3s ease, opacity 0.3s ease;
        pointer-events: none;
      }

      .pearl-button .wrap::before {
        left: -15%;
        right: -15%;
        bottom: 25%;
        top: -100%;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.12);
      }

      .pearl-button .wrap::after {
        left: 6%;
        right: 6%;
        top: 12%;
        bottom: 40%;
        border-radius: 22px 22px 0 0;
        box-shadow: inset 0 10px 8px -10px rgba(255, 255, 255, 0.78);
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.28) 0%,
          rgba(0, 0, 0, 0) 58%,
          rgba(0, 0, 0, 0) 100%
        );
      }

      .pearl-button:hover,
      .pearl-button.active {
        background-color: rgba(8, 8, 8, 0.72);
        box-shadow:
          inset 0 0.18rem 0.42rem rgba(255, 255, 255, 0.32),
          inset 0 -0.08rem 0.22rem rgba(0, 0, 0, 0.7),
          inset 0 -0.24rem 0.58rem rgba(255, 255, 255, 0.32),
          0 0.85rem 1.2rem rgba(0, 0, 0, 0.2);
      }

      .pearl-button:hover .wrap::before,
      .pearl-button.active .wrap::before {
        transform: translateY(-5%);
      }

      .pearl-button:hover .wrap::after,
      .pearl-button.active .wrap::after {
        opacity: 0.55;
        transform: translateY(5%);
      }

      .pearl-button:hover .wrap p,
      .pearl-button.active .wrap p {
        transform: translateY(-4%);
      }

      .pearl-button:active {
        transform: translateY(3px);
      }
    `}</style>
  );
}

export const PearlButtonContent: React.FC<{ label: string }> = ({ label }) => (
  <div className="wrap">
    <p>
      <span>✧</span>
      <span>✦</span>
      {label}
    </p>
  </div>
);

export const PearlButton: React.FC<PearlButtonProps> = ({
  label = "Pearl Button",
  className = "",
  ...props
}) => {
  return (
    <>
      <PearlButtonStyles />
      <button className={`pearl-button ${className}`} {...props}>
        <PearlButtonContent label={label} />
      </button>
    </>
  );
};
