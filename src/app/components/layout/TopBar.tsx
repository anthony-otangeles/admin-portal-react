import { useState, useEffect } from 'react';
import { Icon, Avatar } from '../ui/primitives';
import { HEADER_NOTIFICATIONS, type Notification } from '../../data/mockData';
import otangelesLogoUrl from '../../../imports/otangeles-logo.svg';

// Inline SVG — avoids any path/import issues
function OtangelesLogo() {
  return (
    <svg width="120" height="29" viewBox="0 0 145 35" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <g clipPath="url(#clip0_logo)">
        <path d="M35 17.5C35 7.835 27.165 0 17.5 0C7.835 0 0 7.835 0 17.5C0 27.165 7.835 35 17.5 35C27.165 35 35 27.165 35 17.5Z" fill="url(#paint0_logo)" />
        <path d="M8.5 20.066V17.596C8.5 16.447 8.5 15.873 8.648 15.344C8.779 14.875 8.995 14.435 9.284 14.044C9.611 13.602 10.064 13.249 10.971 12.544L13.571 10.522C14.976 9.429 15.679 8.882 16.455 8.672C17.139 8.487 17.861 8.487 18.545 8.672C19.321 8.882 20.024 9.429 21.429 10.522L24.029 12.544C24.936 13.249 25.389 13.602 25.716 14.044C26.005 14.435 26.221 14.875 26.352 15.344C26.5 15.873 26.5 16.447 26.5 17.596V20.066C26.5 22.306 26.5 23.426 26.064 24.282C25.681 25.034 25.069 25.646 24.316 26.03C23.46 26.466 22.34 26.466 20.1 26.466H14.9C12.66 26.466 11.54 26.466 10.684 26.03C9.931 25.646 9.319 25.034 8.936 24.282C8.5 23.426 8.5 22.306 8.5 20.066Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.476 13.117C21.434 12.937 21.339 12.776 21.205 12.659C21.07 12.542 20.904 12.475 20.731 12.467C20.558 12.46 20.387 12.514 20.245 12.62C20.102 12.725 19.996 12.878 19.942 13.054L17.393 21.243L15.031 15.548C14.967 15.395 14.862 15.265 14.729 15.175C14.597 15.084 14.442 15.038 14.285 15.041C14.128 15.044 13.975 15.097 13.846 15.192C13.716 15.287 13.616 15.421 13.557 15.577L12.158 19.324H9.5V21.039H12.158C12.817 21.039 13.4 20.615 13.643 19.961L14.338 18.1L16.768 23.958C16.898 24.269 17.185 24.467 17.5 24.467L17.538 24.466C17.7 24.458 17.855 24.397 17.983 24.293C18.112 24.188 18.208 24.045 18.258 23.881L20.59 16.388L21.373 19.74C21.459 20.111 21.658 20.441 21.94 20.676C22.221 20.912 22.568 21.039 22.925 21.039H25.5V19.324H22.924L21.476 13.117Z" fill="white" />
      </g>
      <path d="M54.614 18.216C53.618 18.216 52.694 18.054 51.842 17.73C51.002 17.406 50.27 16.95 49.646 16.362C49.034 15.774 48.554 15.084 48.206 14.292C47.87 13.5 47.702 12.636 47.702 11.7C47.702 10.764 47.87 9.9 48.206 9.108C48.554 8.316 49.04 7.626 49.664 7.038C50.288 6.45 51.02 5.994 51.86 5.67C52.7 5.346 53.612 5.184 54.596 5.184C55.592 5.184 56.504 5.346 57.332 5.67C58.172 5.994 58.898 6.45 59.51 7.038C60.134 7.626 60.62 8.316 60.968 9.108C61.316 9.888 61.49 10.752 61.49 11.7C61.49 12.636 61.316 13.506 60.968 14.31C60.62 15.102 60.134 15.792 59.51 16.38C58.898 16.956 58.172 17.406 57.332 17.73C56.504 18.054 55.598 18.216 54.614 18.216ZM54.596 15.732C55.16 15.732 55.676 15.636 56.144 15.444C56.624 15.252 57.044 14.976 57.404 14.616C57.764 14.256 58.04 13.83 58.232 13.338C58.436 12.846 58.538 12.3 58.538 11.7C58.538 11.1 58.436 10.554 58.232 10.062C58.04 9.57 57.764 9.144 57.404 8.784C57.056 8.424 56.642 8.148 56.162 7.956C55.682 7.764 55.16 7.668 54.596 7.668C54.032 7.668 53.51 7.764 53.03 7.956C52.562 8.148 52.148 8.424 51.788 8.784C51.428 9.144 51.146 9.57 50.942 10.062C50.75 10.554 50.654 11.1 50.654 11.7C50.654 12.288 50.75 12.834 50.942 13.338C51.146 13.83 51.422 14.256 51.77 14.616C52.13 14.976 52.55 15.252 53.03 15.444C53.51 15.636 54.032 15.732 54.596 15.732Z" fill="#845EC2" />
      <path d="M67.531 18.144C66.391 18.144 65.503 17.856 64.867 17.28C64.231 16.692 63.913 15.822 63.913 14.67V6.174H66.721V14.634C66.721 15.042 66.829 15.36 67.045 15.588C67.261 15.804 67.555 15.912 67.927 15.912C68.371 15.912 68.749 15.792 69.061 15.552L69.817 17.532C69.529 17.736 69.181 17.892 68.773 18C68.377 18.096 67.963 18.144 67.531 18.144ZM62.419 10.692V8.532H69.133V10.692H62.419Z" fill="#845EC2" />
      <path d="M77.334 18V16.11L77.154 15.696V12.312C77.154 11.712 76.968 11.244 76.596 10.908C76.236 10.572 75.678 10.404 74.922 10.404C74.406 10.404 73.896 10.488 73.392 10.656C72.9 10.812 72.48 11.028 72.132 11.304L71.124 9.342C71.652 8.97 72.288 8.682 73.032 8.478C73.776 8.274 74.532 8.172 75.3 8.172C76.776 8.172 77.922 8.52 78.738 9.216C79.554 9.912 79.962 10.998 79.962 12.474V18H77.334ZM74.382 18.144C73.626 18.144 72.978 18.018 72.438 17.766C71.898 17.502 71.484 17.148 71.196 16.704C70.908 16.26 70.764 15.762 70.764 15.21C70.764 14.634 70.902 14.13 71.178 13.698C71.466 13.266 71.916 12.93 72.528 12.69C73.14 12.438 73.938 12.312 74.922 12.312H77.496V13.95H75.228C74.568 13.95 74.112 14.058 73.86 14.274C73.62 14.49 73.5 14.76 73.5 15.084C73.5 15.444 73.638 15.732 73.914 15.948C74.202 16.152 74.592 16.254 75.084 16.254C75.552 16.254 75.972 16.146 76.344 15.93C76.716 15.702 76.986 15.372 77.154 14.94L77.586 16.236C77.382 16.86 77.01 17.334 76.47 17.658C75.93 17.982 75.234 18.144 74.382 18.144Z" fill="#845EC2" />
      <path d="M88.389 8.172C89.157 8.172 89.841 8.328 90.441 8.64C91.053 8.94 91.533 9.408 91.881 10.044C92.229 10.668 92.403 11.472 92.403 12.456V18H89.595V12.888C89.595 12.108 89.421 11.532 89.073 11.16C88.737 10.788 88.257 10.602 87.633 10.602C87.189 10.602 86.787 10.698 86.427 10.89C86.079 11.07 85.803 11.352 85.599 11.736C85.407 12.12 85.311 12.612 85.311 13.212V18H82.503V8.316H85.185V10.998L84.681 10.188C85.029 9.54 85.527 9.042 86.175 8.694C86.823 8.346 87.561 8.172 88.389 8.172Z" fill="#845EC2" />
      <path d="M99.573 21.636C98.661 21.636 97.779 21.522 96.927 21.294C96.087 21.078 95.385 20.748 94.821 20.304L95.937 18.288C96.345 18.624 96.861 18.888 97.485 19.08C98.121 19.284 98.745 19.386 99.357 19.386C100.353 19.386 101.073 19.164 101.517 18.72C101.973 18.276 102.201 17.616 102.201 16.74V15.282L102.381 12.852L102.345 10.404V8.316H105.009V16.38C105.009 18.18 104.541 19.506 103.605 20.358C102.669 21.21 101.325 21.636 99.573 21.636ZM99.141 17.532C98.241 17.532 97.425 17.34 96.693 16.956C95.973 16.56 95.391 16.014 94.947 15.318C94.515 14.61 94.299 13.788 94.299 12.852C94.299 11.904 94.515 11.082 94.947 10.386C95.391 9.678 95.973 9.132 96.693 8.748C97.425 8.364 98.241 8.172 99.141 8.172C99.957 8.172 100.677 8.34 101.301 8.676C101.925 9 102.411 9.51 102.759 10.206C103.107 10.89 103.281 11.772 103.281 12.852C103.281 13.92 103.107 14.802 102.759 15.498C102.411 16.182 101.925 16.692 101.301 17.028C100.677 17.364 99.957 17.532 99.141 17.532ZM99.699 15.228C100.191 15.228 100.629 15.132 101.013 14.94C101.397 14.736 101.697 14.454 101.913 14.094C102.129 13.734 102.237 13.32 102.237 12.852C102.237 12.372 102.129 11.958 101.913 11.61C101.697 11.25 101.397 10.974 101.013 10.782C100.629 10.578 100.191 10.476 99.699 10.476C99.207 10.476 98.769 10.578 98.385 10.782C98.001 10.974 97.695 11.25 97.467 11.61C97.251 11.958 97.143 12.372 97.143 12.852C97.143 13.32 97.251 13.734 97.467 14.094C97.695 14.454 98.001 14.736 98.385 14.94C98.769 15.132 99.207 15.228 99.699 15.228Z" fill="#845EC2" />
      <path d="M112.428 18.144C111.324 18.144 110.352 17.928 109.512 17.496C108.684 17.064 108.042 16.476 107.586 15.732C107.13 14.976 106.902 14.118 106.902 13.158C106.902 12.186 107.124 11.328 107.568 10.584C108.024 9.828 108.642 9.24 109.422 8.82C110.202 8.388 111.084 8.172 112.068 8.172C113.016 8.172 113.868 8.376 114.624 8.784C115.392 9.18 115.998 9.756 116.442 10.512C116.886 11.256 117.108 12.15 117.108 13.194C117.108 13.302 117.102 13.428 117.09 13.572C117.078 13.704 117.066 13.83 117.054 13.95H109.188V12.312H115.578L114.498 12.798C114.498 12.294 114.396 11.856 114.192 11.484C113.988 11.112 113.706 10.824 113.346 10.62C112.986 10.404 112.566 10.296 112.086 10.296C111.606 10.296 111.18 10.404 110.808 10.62C110.448 10.824 110.166 11.118 109.962 11.502C109.758 11.874 109.656 12.318 109.656 12.834V13.266C109.656 13.794 109.77 14.262 109.998 14.67C110.238 15.066 110.568 15.372 110.988 15.588C111.42 15.792 111.924 15.894 112.5 15.894C113.016 15.894 113.466 15.816 113.85 15.66C114.246 15.504 114.606 15.27 114.93 14.958L116.424 16.578C115.98 17.082 115.422 17.472 114.75 17.748C114.078 18.012 113.304 18.144 112.428 18.144Z" fill="#845EC2" />
      <path d="M118.978 18V4.644H121.786V18H118.978Z" fill="#845EC2" />
      <path d="M129.198 18.144C128.094 18.144 127.122 17.928 126.282 17.496C125.454 17.064 124.812 16.476 124.356 15.732C123.9 14.976 123.672 14.118 123.672 13.158C123.672 12.186 123.894 11.328 124.338 10.584C124.794 9.828 125.412 9.24 126.192 8.82C126.972 8.388 127.854 8.172 128.838 8.172C129.786 8.172 130.638 8.376 131.394 8.784C132.162 9.18 132.768 9.756 133.212 10.512C133.656 11.256 133.878 12.15 133.878 13.194C133.878 13.302 133.872 13.428 133.86 13.572C133.848 13.704 133.836 13.83 133.824 13.95H125.958V12.312H132.348L131.268 12.798C131.268 12.294 131.166 11.856 130.962 11.484C130.758 11.112 130.476 10.824 130.116 10.62C129.756 10.404 129.336 10.296 128.856 10.296C128.376 10.296 127.95 10.404 127.578 10.62C127.218 10.824 126.936 11.118 126.732 11.502C126.528 11.874 126.426 12.318 126.426 12.834V13.266C126.426 13.794 126.54 14.262 126.768 14.67C127.008 15.066 127.338 15.372 127.758 15.588C128.19 15.792 128.694 15.894 129.27 15.894C129.786 15.894 130.236 15.816 130.62 15.66C131.016 15.504 131.376 15.27 131.7 14.958L133.194 16.578C132.75 17.082 132.192 17.472 131.52 17.748C130.848 18.012 130.074 18.144 129.198 18.144Z" fill="#845EC2" />
      <path d="M139.005 18.144C138.177 18.144 137.379 18.048 136.611 17.856C135.855 17.652 135.255 17.4 134.811 17.1L135.747 15.084C136.191 15.36 136.713 15.588 137.313 15.768C137.925 15.936 138.525 16.02 139.113 16.02C139.761 16.02 140.217 15.942 140.481 15.786C140.757 15.63 140.895 15.414 140.895 15.138C140.895 14.91 140.787 14.742 140.571 14.634C140.367 14.514 140.091 14.424 139.743 14.364C139.395 14.304 139.011 14.244 138.591 14.184C138.183 14.124 137.769 14.046 137.349 13.95C136.929 13.842 136.545 13.686 136.197 13.482C135.849 13.278 135.567 13.002 135.351 12.654C135.147 12.306 135.045 11.856 135.045 11.304C135.045 10.692 135.219 10.152 135.567 9.684C135.927 9.216 136.443 8.85 137.115 8.586C137.787 8.31 138.591 8.172 139.527 8.172C140.187 8.172 140.859 8.244 141.543 8.388C142.227 8.532 142.797 8.742 143.253 9.018L142.317 11.016C141.849 10.74 141.375 10.554 140.895 10.458C140.427 10.35 139.971 10.296 139.527 10.296C138.903 10.296 138.447 10.38 138.159 10.548C137.871 10.716 137.727 10.932 137.727 11.196C137.727 11.436 137.829 11.616 138.033 11.736C138.249 11.856 138.531 11.952 138.879 12.024C139.227 12.096 139.605 12.162 140.013 12.222C140.433 12.27 140.853 12.348 141.273 12.456C141.693 12.564 142.071 12.72 142.407 12.924C142.755 13.116 143.037 13.386 143.253 13.734C143.469 14.07 143.577 14.514 143.577 15.066C143.577 15.666 143.397 16.2 143.037 16.668C142.677 17.124 142.155 17.484 141.471 17.748C140.799 18.012 139.977 18.144 139.005 18.144Z" fill="#845EC2" />
      {/* "Note+" text in mint */}
      <path d="M47.996 30V21.6H49.604L54.56 27.648H53.78V21.6H55.7V30H54.104L49.136 23.952H49.916V30H47.996ZM60.627 30.096C59.939 30.096 59.327 29.952 58.791 29.664C58.263 29.376 57.843 28.984 57.531 28.488C57.227 27.984 57.075 27.412 57.075 26.772C57.075 26.124 57.227 25.552 57.531 25.056C57.843 24.552 58.263 24.16 58.791 23.88C59.327 23.592 59.939 23.448 60.627 23.448C61.307 23.448 61.915 23.592 62.451 23.88C62.987 24.16 63.407 24.548 63.711 25.044C64.015 25.54 64.167 26.116 64.167 26.772C64.167 27.412 64.015 27.984 63.711 28.488C63.407 28.984 62.987 29.376 62.451 29.664C61.915 29.952 61.307 30.096 60.627 30.096ZM60.627 28.56C60.939 28.56 61.219 28.488 61.467 28.344C61.715 28.2 61.911 27.996 62.055 27.732C62.199 27.46 62.271 27.14 62.271 26.772C62.271 26.396 62.199 26.076 62.055 25.812C61.911 25.548 61.715 25.344 61.467 25.2C61.219 25.056 60.939 24.984 60.627 24.984C60.315 24.984 60.035 25.056 59.787 25.2C59.539 25.344 59.339 25.548 59.187 25.812C59.043 26.076 58.971 26.396 58.971 26.772C58.971 27.14 59.043 27.46 59.187 27.732C59.339 27.996 59.539 28.2 59.787 28.344C60.035 28.488 60.315 28.56 60.627 28.56ZM68.059 30.096C67.299 30.096 66.707 29.904 66.283 29.52C65.859 29.128 65.647 28.548 65.647 27.78V22.116H67.519V27.756C67.519 28.028 67.591 28.24 67.735 28.392C67.879 28.536 68.075 28.608 68.323 28.608C68.619 28.608 68.871 28.528 69.079 28.368L69.583 29.688C69.391 29.824 69.159 29.928 68.887 30C68.623 30.064 68.347 30.096 68.059 30.096ZM64.651 25.128V23.688H69.127V25.128H64.651ZM73.638 30.096C72.902 30.096 72.254 29.952 71.694 29.664C71.142 29.376 70.714 28.984 70.41 28.488C70.106 27.984 69.954 27.412 69.954 26.772C69.954 26.124 70.102 25.552 70.398 25.056C70.702 24.552 71.114 24.16 71.634 23.88C72.154 23.592 72.742 23.448 73.398 23.448C74.03 23.448 74.598 23.584 75.102 23.856C75.614 24.12 76.018 24.504 76.314 25.008C76.61 25.504 76.758 26.1 76.758 26.796C76.758 26.868 76.754 26.952 76.746 27.048C76.738 27.136 76.73 27.22 76.722 27.3H71.478V26.208H75.738L75.018 26.532C75.018 26.196 74.95 25.904 74.814 25.656C74.678 25.408 74.49 25.216 74.25 25.08C74.01 24.936 73.73 24.864 73.41 24.864C73.09 24.864 72.806 24.936 72.558 25.08C72.318 25.216 72.13 25.412 71.994 25.668C71.858 25.916 71.79 26.212 71.79 26.556V26.844C71.79 27.196 71.866 27.508 72.018 27.78C72.178 28.044 72.398 28.248 72.678 28.392C72.966 28.528 73.302 28.596 73.686 28.596C74.03 28.596 74.33 28.544 74.586 28.44C74.85 28.336 75.09 28.18 75.306 27.972L76.302 29.052C76.006 29.388 75.634 29.648 75.186 29.832C74.738 30.008 74.222 30.096 73.638 30.096ZM80.078 28.572V23.028H81.626V28.572H80.078ZM78.002 26.532V25.068H83.714V26.532H78.002Z" fill="#00C9A7" />
      <defs>
        <linearGradient id="paint0_logo" x1="0" y1="0" x2="35" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0.370192" stopColor="#845EC2" />
          <stop offset="1" stopColor="#00C9A7" />
        </linearGradient>
        <clipPath id="clip0_logo">
          <rect width="35" height="35" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function NotifRow({ n, divider }: { n: Notification; divider: boolean }) {
  const isReturned = n.kind === 'returned';
  const iconBg = isReturned ? '#FFF3F8' : '#E7F5EF';
  const iconColor = isReturned ? '#C34A7D' : '#29BB89';
  return (
    <div style={{ padding: '14px 20px', borderTop: divider ? '1px solid #F3F4F6' : 'none', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ width: 36, height: 36, borderRadius: 9999, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="activity" size={16} color={iconColor} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1C192E' }}>{n.title}</span>
          <span style={{ fontSize: 12, color: '#99A1AF' }}>{n.when}</span>
          {n.unread && <span style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: 9999, background: '#29BB89', flexShrink: 0 }} />}
        </div>
        <div style={{ fontSize: 13, color: '#1C192E', marginTop: 4, lineHeight: '20px' }}>
          {n.who} {n.verb} <strong>#{n.enc}</strong>.
        </div>
        {n.body && <div style={{ fontSize: 13, color: '#6A7282', marginTop: 4, lineHeight: '20px' }}>{n.body}</div>}
      </div>
    </div>
  );
}

function ImpersonationOverlay({ role, onClose }: { role: string | null; onClose: () => void }) {
  if (!role) return null;
  const config: Record<string, { tone: string; tint: string; icon: string; portal: string; blurb: string; surfaces: string[] }> = {
    Provider: { tone: '#0081CF', tint: '#E6F3FB', icon: 'shield', portal: 'Provider Portal', blurb: 'Author HPI/ROS/PE/A&P, sign your own encounters, manage your patient panel, and review billing rejections.', surfaces: ['My Encounters queue', 'Sign Note', 'Patient Panel', 'My Earnings', 'Notifications'] },
    Scribe:   { tone: '#29BB89', tint: '#E7F5EF', icon: 'fileText', portal: 'Scribe Portal', blurb: 'Pick up unassigned encounters, draft notes from transcript + dictation, route to the assigned provider for sign-off.', surfaces: ['Unassigned Queue', 'Draft Note', 'Returned-for-Revision', 'My Productivity', 'Notifications'] },
    Clerk:    { tone: '#B58420', tint: '#FFF8E6', icon: 'workflow', portal: 'Clerk Portal', blurb: 'Schedule and check in patients, capture demographics + insurance, manage facility rosters and shift coverage.', surfaces: ["Today's Schedule", 'Check-in', 'Patient Demographics', 'Coverage Board', 'Facility Roster'] },
  };
  const c = config[role];
  if (!c) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 12, width: 540, overflow: 'hidden', boxShadow: '0 24px 48px -12px rgba(28,25,46,0.24)' }}>
        <div style={{ height: 6, background: c.tone }} />
        <div style={{ padding: '24px 28px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: c.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={c.icon} size={22} color={c.tone} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#99A1AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Switch view</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1C192E' }}>Open the {c.portal}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#6A7282', lineHeight: '20px', marginBottom: 16 }}>
            You'll preview Otangeles as a {role}. {c.blurb} Your Super Admin session continues in this tab.
          </div>
          <div style={{ border: '1px solid #EEEEEE', borderRadius: 8, padding: '12px 14px', marginBottom: 16, background: '#FAFAFA' }}>
            <div style={{ fontSize: 11, color: '#6A7282', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>You'll see</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {c.surfaces.map(s => <span key={s} style={{ padding: '4px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 600, background: '#fff', color: '#1C192E', border: '1px solid #E5E7EB' }}>{s}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 12, borderRadius: 8, background: '#FFF8E6', border: '1px solid #FFE9A6', fontSize: 12, color: '#825E13', lineHeight: '18px' }}>
            <Icon name="info" size={16} color="#B58420" />
            <span><strong>Sandboxed.</strong> Any actions you take while viewing as {role} are dry-run only — nothing is written to the production audit log or clinical record.</span>
          </div>
        </div>
        <div style={{ padding: '14px 24px', borderTop: '1px solid #EEEEEE', display: 'flex', justifyContent: 'flex-end', gap: 8, background: '#FAFAFA' }}>
          <button onClick={onClose} style={{ padding: '10px 16px', borderRadius: 4, border: '1px solid #E5E7EB', background: '#fff', color: '#6A7282', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>Cancel</button>
          <button onClick={onClose} style={{ padding: '10px 16px', borderRadius: 4, border: 0, background: '#845EC2', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Open {role} view <Icon name="chevronRight" size={16} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function TopBar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(HEADER_NOTIFICATIONS);
  const [switchRole, setSwitchRole] = useState<string | null>(null);
  const unreadCount = notifs.filter(n => n.unread).length;

  useEffect(() => {
    if (!profileOpen && !notifOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-popover]')) {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [profileOpen, notifOpen]);

  return (
    <>
      <div style={{
        height: 64, background: '#fff', borderBottom: '1px solid #E5E7EB',
        display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
        flexShrink: 0, zIndex: 20,
      }}>
        <img src={otangelesLogoUrl} height={30} style={{ display: 'block', flexShrink: 0 }} alt="Otangeles" />

        <div style={{ width: 1, height: 28, background: '#E5E7EB', flexShrink: 0 }} />
        <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#6A7282', whiteSpace: 'nowrap' }}>Admin Portal</div>

        <div style={{ flex: 1 }} />

        {/* Search */}
        <div style={{
          width: 420, maxWidth: '38vw', minWidth: 260, background: '#F7F7F7',
          border: '1px solid #E5E7EB', borderRadius: 5, height: 40,
          display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
          fontSize: 14, color: '#99A1AF', cursor: 'default', flexShrink: 1,
        }}>
          <Icon name="search" size={16} color="#99A1AF" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Search users, roles, settings, audit log…</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#99A1AF', border: '1px solid #E5E7EB', borderRadius: 4, padding: '1px 6px', background: '#fff', fontFamily: 'JetBrains Mono' }}>⌘K</span>
        </div>

        {/* Bell */}
        <div data-popover style={{ position: 'relative', flexShrink: 0 }}>
          <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} style={{ width: 40, height: 40, borderRadius: 9999, background: notifOpen ? '#F5F2FD' : '#fff', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}>
            <Icon name="bell" size={18} color={notifOpen ? '#845EC2' : '#6A7282'} />
            {unreadCount > 0 && <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 9999, background: '#C9302C', border: '2px solid #fff' }} />}
          </button>
          {notifOpen && (
            <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 48, right: 0, width: 420, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, boxShadow: '0 16px 32px -10px rgba(28,25,46,0.16)', zIndex: 30, overflow: 'hidden', maxHeight: 'calc(100vh - 96px)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1C192E' }}>Notifications</div>
                <button onClick={() => setNotifs(notifs.map(n => ({ ...n, unread: false })))} style={{ padding: '6px 12px', border: '1px solid #E5DBFA', borderRadius: 6, background: '#fff', color: '#845EC2', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>Mark All as Read</button>
              </div>
              <div style={{ overflowY: 'auto', borderTop: '1px solid #EEEEEE' }}>
                {notifs.map((n, i) => <NotifRow key={n.id} n={n} divider={i > 0} />)}
              </div>
              <div style={{ borderTop: '1px solid #EEEEEE', padding: '14px 20px', textAlign: 'center' }}>
                <button style={{ background: 'transparent', border: 0, color: '#6A7282', fontSize: 13, fontWeight: 600, fontFamily: 'Inter', cursor: 'pointer' }}>Load More</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile — avatar icon only, no name/role for consistency */}
        <div data-popover onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, marginLeft: 4, cursor: 'pointer', flexShrink: 0 }}>
          <Avatar initials="SA" size={36} />
          <Icon name="chevronDown" size={16} color="#6A7282" />
          {profileOpen && (
            <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 48, right: 0, width: 260, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, boxShadow: '0 12px 24px -8px rgba(28,25,46,0.12)', zIndex: 30, overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: 12, color: '#99A1AF', fontWeight: 500 }}>Signed in as</div>
                <div style={{ fontSize: 14, color: '#1C192E', fontWeight: 600, marginTop: 4 }}>sarah.avila@otangeles.com</div>
              </div>
              <div style={{ height: 1, background: '#EEEEEE' }} />
              <div style={{ padding: '12px 16px 6px' }}>
                <div style={{ fontSize: 11, color: '#99A1AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Switch view</div>
                <div style={{ fontSize: 11, color: '#99A1AF', marginTop: 3, lineHeight: '15px' }}>Preview the product as another role. Read-only — actions are sandboxed.</div>
              </div>
              {(['Provider', 'Scribe', 'Clerk'] as const).map(r => {
                const colors: Record<string, { tone: string; tint: string; icon: string }> = {
                  Provider: { tone: '#0081CF', tint: '#E6F3FB', icon: 'shield' },
                  Scribe:   { tone: '#29BB89', tint: '#E7F5EF', icon: 'fileText' },
                  Clerk:    { tone: '#B58420', tint: '#FFF8E6', icon: 'workflow' },
                };
                const rc = colors[r];
                return (
                  <button key={r} onClick={() => { setProfileOpen(false); setSwitchRole(r); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'transparent', border: 0, fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#1C192E', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: rc.tint, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={rc.icon} size={14} color={rc.tone} />
                    </span>
                    <span style={{ flex: 1 }}>View as {r}</span>
                    <Icon name="chevronRight" size={14} color="#99A1AF" />
                  </button>
                );
              })}
              <div style={{ height: 1, background: '#EEEEEE', marginTop: 6 }} />
              <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'transparent', border: 0, fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#C34A7D', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                <Icon name="logout" size={16} color="#C34A7D" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <ImpersonationOverlay role={switchRole} onClose={() => setSwitchRole(null)} />
    </>
  );
}
