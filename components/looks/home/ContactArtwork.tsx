/** Two offset speech tiles, drawn in the same green inks as the field guide. */
export function ContactArtwork() {
  const bubble = "M18 0h128q18 0 18 18v63q0 18-18 18H59l-28 26V99H18Q0 99 0 81V18Q0 0 18 0Z";
  return (
    <svg viewBox="0 0 375 224" aria-hidden="true" focusable="false">
      <g transform="matrix(.95 -.24 0 .9 32 68)" stroke="var(--h-teal)" strokeLinejoin="round">
        <path d={bubble} transform="translate(6 6)" fill="var(--h-teal)" />
        <path d={bubble} fill="var(--h-mist)" strokeWidth="2" />
        <path d="M24 29h81m-81 15h110m-110 15h65" fill="none" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform="matrix(.95 .25 0 .9 171 66)" strokeLinejoin="round">
        <path d="M16 4h132q16 0 16 16v65q0 16-16 16h-10v25l-31-25H16Q0 101 0 85V20Q0 4 16 4Z" fill="var(--h-mint-text)" stroke="var(--h-teal)" strokeWidth="2" transform="translate(-5 6)" />
        <path d="M16 4h132q16 0 16 16v65q0 16-16 16h-10v25l-31-25H16Q0 101 0 85V20Q0 4 16 4Z" fill="var(--h-teal)" />
        {[36, 71, 106].map(x => <rect key={x} x={x} y="42" width="20" height="20" rx="5" fill="var(--h-on-teal-2)" />)}
      </g>
    </svg>
  );
}
