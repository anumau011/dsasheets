import React from "react";
import { FileText, TicketX } from "lucide-react";
const YoutubeIcon = ({ size = 24, color = "#FF0000", ...props }) => {
    return (
        <svg
            xmlns="http://w3.org"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={color}
            {...props}
        >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
};

const StarIcon = ({ size = 24, color = "#FFD700", ...props }) => {
    return (
        <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>
    );
};

const PlusIcon = ({ size = 24, color = "currentColor", ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M5 12h14" /><path d="M12 5v14" />
        </svg>
    );
};

const LeetCodeLogo = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="leetcode">
            <path fill="#B3B1B0" d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"></path>
            <path fill="#E7A41F" d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"></path>
            <path fill="#070706" d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"></path>
        </svg>
    );
}

const FileTextIcon = ({ size = 24, color = "currentColor", ...props }) => {
    return (
        <FileText width={size} height={size} stroke={color} {...props} />
    );
};

const TicketXIcon = ({ size = 24, color = "currentColor", ...props }) => {
    return (
        <TicketX width={size} height={size} stroke={color} {...props} />
    );
}

const GeeksforGeeksLogo = ({ size = 24, color = "currentColor", ...props }) => {
    return (
        <img
            className="gfgLogoImg normal transition-transform duration-200 hover:scale-110"
            src="https://media.geeksforgeeks.org/gfg-gg-logo.svg"
            alt="geeksforgeeks"
            width="24"
            height="24"
        />
    )
}

const CodingNinjasLogo = ({ size = 24, color = "currentColor", ...props }) => {
    return (
        <img
            src="https://dmmy6mpbxgeck.cloudfront.net/68b82ab2-3e36-4428-aa21-6e5e2cd407c5/widget/8f96fa5f-3a91-4de7-8881-c62376b37acf"
            width="100%"
            height="100%"
            alt="Coding Ninjas Widget"
        />
    )
}

export { YoutubeIcon, StarIcon, PlusIcon, LeetCodeLogo, FileTextIcon, TicketXIcon, GeeksforGeeksLogo, CodingNinjasLogo };
