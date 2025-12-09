import { useState } from 'react';

export default function SparklyBar(props) {
    const { fill, x, y, width, height } = props;
    const [isHovered, setIsHovered] = useState(false);

    const gradientId = `sparklyGradient-${x}-${y}`;

    return (
        <g>
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <animate
                        attributeName="x1"
                        values="0;1;0"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                    <stop offset="0%" stopColor="#fbbfc4" stopOpacity="1">
                        <animate
                            attributeName="stop-color"
                            values="#fbbfc4;#fcd5b5;#fef3b8;#c5f5c7;#b5f5f5;#bdd7ff;#c4b5fd;#e5c5f5;#f4c4dd;#fbbfc4"
                            dur="5s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="50%" stopColor="#b5f5f5" stopOpacity="1">
                        <animate
                            attributeName="stop-color"
                            values="#b5f5f5;#bdd7ff;#c4b5fd;#e5c5f5;#f4c4dd;#fbbfc4;#fcd5b5;#fef3b8;#c5f5c7;#b5f5f5"
                            dur="5s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="100%" stopColor="#e5c5f5" stopOpacity="1">
                        <animate
                            attributeName="stop-color"
                            values="#e5c5f5;#f4c4dd;#fbbfc4;#fcd5b5;#fef3b8;#c5f5c7;#b5f5f5;#bdd7ff;#c4b5fd;#e5c5f5"
                            dur="5s"
                            repeatCount="indefinite"
                        />
                    </stop>
                </linearGradient>

                <filter id={`sparkleFilter-${x}-${y}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                        result="glow"
                    />
                    <feBlend in="SourceGraphic" in2="glow" mode="normal" />
                </filter>
            </defs>

            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={`url(#${gradientId})`}
                opacity="0.3"
                filter={`url(#sparkleFilter-${x}-${y})`}
            >
                <animate
                    attributeName="opacity"
                    values="0.3;0.6;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                />
            </rect>

            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={`url(#${gradientId})`}
                stroke="#fbbfc4"
                strokeWidth="2"
                rx="8"
                ry="8"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    cursor: 'pointer',
                    filter: isHovered
                        ? 'drop-shadow(0 0 10px #fbbfc4) drop-shadow(0 0 20px #b5f5f5) drop-shadow(0 0 30px #fef3b8)'
                        : 'drop-shadow(0 4px 6px rgba(251, 191, 196, 0.3))',
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center',
                }}
            >
                <animate
                    attributeName="stroke"
                    values="#fbbfc4;#fcd5b5;#fef3b8;#c5f5c7;#b5f5f5;#bdd7ff;#c4b5fd;#e5c5f5;#f4c4dd;#fbbfc4"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </rect>

            {[...Array(3)].map((_, i) => (
                <text
                    key={i}
                    x={x + width / 2 + (i - 1) * 15}
                    y={y - 10 - i * 5}
                    fontSize="12"
                    fill="#fbbf24"
                    textAnchor="middle"
                    style={{
                        filter: 'drop-shadow(0 0 3px #fbbf24)',
                    }}
                >
                    ✨
                    <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur="1.5s"
                        begin={`${i * 0.3}s`}
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="y"
                        values={`${y - 10 - i * 5};${y - 15 - i * 5};${y - 10 - i * 5}`}
                        dur="2s"
                        begin={`${i * 0.3}s`}
                        repeatCount="indefinite"
                    />
                </text>
            ))}

            {isHovered && (
                <>
                    <circle
                        cx={x + width / 2}
                        cy={y + height / 2}
                        r="5"
                        fill="#fbbfc4"
                        opacity="0.8"
                    >
                        <animate
                            attributeName="r"
                            values="5;20;5"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.8;0;0.8"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="fill"
                            values="#fbbfc4;#fef3b8;#b5f5f5;#c4b5fd;#f4c4dd;#fbbfc4"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle
                        cx={x + width / 2}
                        cy={y + height / 2}
                        r="5"
                        fill="#c5f5c7"
                        opacity="0.8"
                    >
                        <animate
                            attributeName="r"
                            values="5;20;5"
                            dur="1s"
                            begin="0.5s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.8;0;0.8"
                            dur="1s"
                            begin="0.5s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="fill"
                            values="#c5f5c7;#bdd7ff;#e5c5f5;#fcd5b5;#c5f5c7"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </>
            )}
        </g>
    );
}
