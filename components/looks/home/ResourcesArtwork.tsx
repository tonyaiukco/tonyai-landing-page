/** An open field guide, drawn in the same green inks as the company illustration. */
export function ResourcesArtwork() {
  const spread = "M88 98Q153 92 243 132Q298 87 391 69L351 208Q277 220 203 271Q129 239 48 237Z";

  return (
    <svg className="h-resource-art" viewBox="32 54 376 245" aria-hidden="true" focusable="false">
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d={spread} transform="translate(0 13)" fill="var(--h-teal)" stroke="var(--h-teal)" strokeWidth="5" />
        <path d={spread} transform="translate(0 7)" fill="var(--h-mint-text)" stroke="var(--h-teal)" />
        <path d={spread} fill="var(--h-white)" stroke="var(--h-teal)" strokeWidth="1.6" />
        <path d="M243 132Q232 156 203 271" fill="none" stroke="var(--h-mist-rule)" strokeWidth="2" />
        <g transform="matrix(1 .22 -.29 1 103 117)">
          <path d="M0 0h43" stroke="var(--h-teal)" strokeWidth="5" />
          <path d="M0 12h72" stroke="var(--h-mint-text)" strokeWidth="2" />
          <path d="M7 89V62l21-13v13l22-14v13h12l4-34h11l4 38h13v24Z" fill="var(--h-mist)" stroke="var(--h-teal)" strokeWidth="1.6" />
          <path d="M17 72h10v7H17zm18 0h10v7H35zm18 0h10v7H53z" fill="var(--h-mint-text)" />
          <path d="M0 98h106m-106 8h68" stroke="var(--h-mint-text)" strokeWidth="2" />
        </g>
        <g transform="matrix(1 -.33 -.29 1 261 138)">
          <path d="M0 0h53" stroke="var(--h-teal)" strokeWidth="5" />
          <circle cx="27" cy="47" r="20" fill="none" stroke="var(--h-mint-text)" strokeWidth="9" />
          <path d="M27 27a20 20 0 0 1 17.32 30" fill="none" stroke="var(--h-teal)" strokeWidth="9" strokeLinecap="butt" />
          <path d="M63 59V43m12 16V33m12 26V21" stroke="var(--h-mint)" strokeWidth="7" strokeLinecap="butt" />
          <path d="M0 85h88m-88 9h59" stroke="var(--h-mint-text)" strokeWidth="2" />
        </g>
        <path d="M314 95q9-4 19-7l-8 29-7-4-11 10Z" fill="var(--h-mint)" stroke="var(--h-teal)" />
      </g>
    </svg>
  );
}
