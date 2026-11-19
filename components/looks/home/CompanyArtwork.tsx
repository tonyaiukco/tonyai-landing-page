/** Three sheets in the same axonometric grid bring the founders' disciplines together. */
export function CompanyArtwork() {
  const plane = "matrix(1 .38 -.82 .51 230 43)";
  return (
    <div className="h-opening-art company-art" aria-hidden="true">
      <svg viewBox="83 28 345 283" focusable="false">
        <g transform="translate(0 100)">
          <g transform={plane}>
            <rect y="8" width="184" height="158" rx="18" fill="#29553E" />
            <rect width="184" height="158" rx="18" fill="#1C5E3A" />
            {[36, 70, 104, 138].map(x => <path key={x} d={`M${x} 19v121`} stroke="#B1D2BD" />)}
            {[42, 77, 112].map(y => <path key={y} d={`M16 ${y}h152`} stroke="#B1D2BD" />)}
          </g>
        </g>
        <g transform="translate(0 50)">
          <g transform={plane}>
            <rect y="7" width="184" height="158" rx="18" fill="#1C5E3A" />
            <rect width="184" height="158" rx="18" fill="#B1D2BD" />
            <path d="M32 125h56V72h62M88 72V28" fill="none" stroke="#1C5E3A" strokeWidth="4" />
            {[32, 88, 144].map((x, i) => <rect key={x} x={x-8} y={[116,20,64][i]} width="16" height="16" rx="4" fill="#1C5E3A" />)}
          </g>
        </g>
        <g transform={plane}>
          <rect y="7" width="184" height="158" rx="18" fill="#B1D2BD" stroke="#1C5E3A" />
          <rect width="184" height="158" rx="18" fill="white" stroke="#1C5E3A" />
          <g transform="translate(42 29)">
            <g fill="#1C5E3A"><rect width="45" height="45" rx="10" /><rect y="52" width="45" height="45" rx="10" /><rect x="52" y="52" width="45" height="45" rx="10" /></g>
            <path d="M52 45A45 45 0 0 1 97 0A45 45 0 0 1 52 45Z" fill="#39C656" />
          </g>
        </g>
      </svg>
    </div>
  );
}
