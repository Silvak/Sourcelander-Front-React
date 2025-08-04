import {
  //ArrowRight,
  //Users,
  //Shield,
  //Clock,
  Star,
  CheckCircle,
  //TrendingUp,
  //Award,
  //Search,
  //Filter,
  //Globe,
} from "lucide-react";

export default function HeroGraph() {
  return (
    <div className="relative">
      {/* Enhanced Freelancer Network Illustration */}
      <div className="w-full h-[500px] relative overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <defs>
            <linearGradient
              id="hubGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F3841B" />
              <stop offset="100%" stopColor="#002BFF" />
            </linearGradient>
            <linearGradient
              id="nodeGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#DBEAFE" />
            </linearGradient>
            <linearGradient
              id="nodeGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Grid */}
          <pattern
            id="grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
          </pattern>
          <rect width="400" height="400" fill="url(#grid)" />

          {/* Central Hub - Enhanced */}
          <circle
            cx="200"
            cy="200"
            r="45"
            fill="url(#hubGradient)"
            filter="url(#glow)"
            className="animate-pulse"
          />
          <circle cx="200" cy="200" r="25" fill="white" opacity="0.3" />
          <circle cx="200" cy="200" r="15" fill="white" />

          {/* Freelancer Nodes - Tier 1 */}
          <g className="animate-pulse" style={{ animationDelay: "0s" }}>
            <circle
              cx="120"
              cy="120"
              r="25"
              fill="url(#nodeGradient1)"
              stroke="#F3841B"
              strokeWidth="3"
            />
            <circle
              cx="280"
              cy="120"
              r="25"
              fill="url(#nodeGradient1)"
              stroke="#002BFF"
              strokeWidth="3"
            />
            <circle
              cx="120"
              cy="280"
              r="25"
              fill="url(#nodeGradient1)"
              stroke="#002BFF"
              strokeWidth="3"
            />
            <circle
              cx="280"
              cy="280"
              r="25"
              fill="url(#nodeGradient1)"
              stroke="#F3841B"
              strokeWidth="3"
            />
          </g>

          {/* Freelancer Nodes - Tier 2 */}
          <g className="animate-pulse" style={{ animationDelay: "0.5s" }}>
            <circle
              cx="80"
              cy="200"
              r="22"
              fill="url(#nodeGradient2)"
              stroke="#002BFF"
              strokeWidth="3"
            />
            <circle
              cx="320"
              cy="200"
              r="22"
              fill="url(#nodeGradient2)"
              stroke="#F3841B"
              strokeWidth="3"
            />
            <circle
              cx="200"
              cy="80"
              r="22"
              fill="url(#nodeGradient2)"
              stroke="#002BFF"
              strokeWidth="3"
            />
            <circle
              cx="200"
              cy="320"
              r="22"
              fill="url(#nodeGradient2)"
              stroke="#F3841B"
              strokeWidth="3"
            />
          </g>

          {/* Outer Ring Nodes */}
          <g className="animate-pulse" style={{ animationDelay: "1s" }}>
            <circle
              cx="60"
              cy="120"
              r="18"
              fill="#F0FDF4"
              stroke="#002BFF"
              strokeWidth="2"
            />
            <circle
              cx="340"
              cy="120"
              r="18"
              fill="#F0FDF4"
              stroke="#F3841B"
              strokeWidth="2"
            />
            <circle
              cx="60"
              cy="280"
              r="18"
              fill="#F0FDF4"
              stroke="#002BFF"
              strokeWidth="2"
            />
            <circle
              cx="340"
              cy="280"
              r="18"
              fill="#F0FDF4"
              stroke="#F3841B"
              strokeWidth="2"
            />
          </g>

          {/* Connection Lines - Enhanced */}
          <g className="opacity-60">
            {/* Primary connections */}
            <line
              x1="145"
              y1="145"
              x2="175"
              y2="175"
              stroke="#F3841B"
              strokeWidth="3"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
            <line
              x1="255"
              y1="145"
              x2="225"
              y2="175"
              stroke="#002BFF"
              strokeWidth="3"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
            <line
              x1="145"
              y1="255"
              x2="175"
              y2="225"
              stroke="#002BFF"
              strokeWidth="3"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
            <line
              x1="255"
              y1="255"
              x2="225"
              y2="225"
              stroke="#F3841B"
              strokeWidth="3"
              strokeDasharray="5,5"
              className="animate-pulse"
            />

            {/* Secondary connections */}
            <line
              x1="102"
              y1="200"
              x2="155"
              y2="200"
              stroke="#002BFF"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
            <line
              x1="245"
              y1="200"
              x2="298"
              y2="200"
              stroke="#F3841B"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
            <line
              x1="200"
              y1="102"
              x2="200"
              y2="155"
              stroke="#002BFF"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
            <line
              x1="200"
              y1="245"
              x2="200"
              y2="298"
              stroke="#F3841B"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
          </g>

          {/* Skill Icons - Enhanced */}
          <text x="120" y="127" textAnchor="middle" className="text-lg">
            💻
          </text>
          <text x="280" y="127" textAnchor="middle" className="text-lg">
            🎨
          </text>
          <text x="120" y="287" textAnchor="middle" className="text-lg">
            ✍️
          </text>
          <text x="280" y="287" textAnchor="middle" className="text-lg">
            📊
          </text>
          <text x="80" y="207" textAnchor="middle" className="text-lg">
            📱
          </text>
          <text x="320" y="207" textAnchor="middle" className="text-lg">
            🎬
          </text>
          <text x="200" y="87" textAnchor="middle" className="text-lg">
            🔧
          </text>
          <text x="200" y="327" textAnchor="middle" className="text-lg">
            📈
          </text>

          {/* Outer ring skills */}
          <text x="60" y="127" textAnchor="middle" className="text-sm">
            🎯
          </text>
          <text x="340" y="127" textAnchor="middle" className="text-sm">
            🚀
          </text>
          <text x="60" y="287" textAnchor="middle" className="text-sm">
            💡
          </text>
          <text x="340" y="287" textAnchor="middle" className="text-sm">
            ⚡
          </text>

          {/* Floating Elements */}
          <g
            className="animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "3s" }}
          >
            <circle cx="350" cy="60" r="8" fill="#F3841B" opacity="0.7" />
            <text x="350" y="65" textAnchor="middle" className="text-xs">
              🔥
            </text>
          </g>
          <g
            className="animate-bounce"
            style={{ animationDelay: "2.5s", animationDuration: "3s" }}
          >
            <circle cx="50" cy="350" r="8" fill="#002BFF" opacity="0.7" />
            <text x="50" y="355" textAnchor="middle" className="text-xs">
              ⭐
            </text>
          </g>
        </svg>
      </div>

      <div className="absolute border top-10 right-0 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-float">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-sm">Project Completed</div>
            <div className="text-xs text-gray-600">React Developer matched</div>
          </div>
        </div>
      </div>

      <div
        className="absolute border bottom-10 left-0 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Star className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-sm">5.0 Rating</div>
            <div className="text-xs text-gray-600">UI/UX Designer</div>
          </div>
        </div>
      </div>
    </div>
  );
}
