import React from 'react';

interface GyozenShieldLogoProps {
  className?: string;
}

export const GyozenShieldLogo: React.FC<GyozenShieldLogoProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 390"
      role="img"
      aria-label="Logo Dimsum Gyozen dengan lambang perisai, ilustrasi gyoza dan sumpit"
      className={className}
    >
      <path
        d="M55,25 H305 A26,26 0 0,1 331,51 V198 A151,151 0 0,1 180,349 A151,151 0 0,1 29,198 V51 A26,26 0 0,1 55,25 Z"
        fill="#7C1315"
        stroke="#5C2415"
        strokeWidth="14"
      />
      <g fill="#FFFFFF" transform="translate(0, 4)">
        <path d="M72,72 H106 V82 H83 V104 H97 V94 H89 V86 H107 V116 H97 V113 H72 Z" />
        <path d="M116,72 H127 L133,88 L139,72 H150 L141,96 H145 V104 H138 V115 H128 V104 H121 V96 H125 Z" />
        <path d="M159,72 H193 V114 H159 Z M170,82 V104 H182 V82 Z" />
        <path d="M204,72 H238 V82 L219,104 H239 V114 H203 V104 L222,82 H204 Z" />
        <path d="M248,72 H280 V82 H259 V89 H275 V97 H259 V104 H281 V114 H248 Z" />
        <path d="M290,72 H301 L315,96 V72 H325 V114 H315 L300,89 V114 H290 Z" />
      </g>
      <path d="M68,128 L73,141 L86,146 L73,151 L68,164 L63,151 L50,146 L63,141 Z" fill="#E8A838" />
      <path d="M96,158 L99,165 L106,168 L99,171 L96,178 L93,171 L86,168 L93,165 Z" fill="#E8A838" />
      <path d="M68,186 L72,196 L82,200 L72,204 L68,214 L64,204 L54,200 L64,196 Z" fill="#E8A838" />
      <path d="M275,134 L282,150 L298,157 L282,164 L275,180 L268,164 L252,157 L268,150 Z" fill="#E8A838" />
      <path d="M306,120 L309,128 L317,131 L309,134 L306,142 L303,134 L295,131 L303,128 Z" fill="#E8A838" />
      <path d="M294,174 L297,182 L305,185 L297,188 L294,196 L291,188 L283,185 L291,182 Z" fill="#E8A838" />
      <circle cx="180" cy="226" r="92" fill="#FFFFFF" />
      <path d="M88,284 L314,234 L318,246 L88,290 Z" fill="#5A3219" />
      <path d="M88,294 L318,266 L320,278 L88,299 Z" fill="#5A3219" />
      <path
        d="M77,255 C80,226 95,208 112,200 C123,186 140,180 154,183 C168,172 192,172 206,182 C224,180 242,190 250,206 C268,214 282,232 282,248 C275,264 252,272 238,278 C202,292 146,294 114,280 C96,274 82,266 77,255 Z"
        fill="#FCE5CD"
        stroke="#5A3219"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path d="M110,256 C132,222 216,222 238,262 C204,282 144,282 110,256 Z" fill="#F9D5B3" />
      <path d="M112,200 C114,218 119,232 125,244" fill="none" stroke="#5A3219" strokeWidth="7.5" strokeLinecap="round" />
      <path d="M154,183 C150,204 152,220 156,235" fill="none" stroke="#5A3219" strokeWidth="7.5" strokeLinecap="round" />
      <path d="M206,182 C198,202 198,220 201,235" fill="none" stroke="#5A3219" strokeWidth="7.5" strokeLinecap="round" />
      <path d="M250,206 C243,222 238,236 234,248" fill="none" stroke="#5A3219" strokeWidth="7.5" strokeLinecap="round" />
    </svg>
  );
};
