import React from 'react';

function TopBar() {
  return (
    <div className="flex align-top bg-black text-white justify-end px-5">
      <div className="text-sm flex">
        <a
          href="https://github.com/connect2aq/bonzerflix"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/GitHub-Mark.png"
            width={25}
            height={25}
            alt="github logo"
          />
        </a>
      </div>
    </div>
  );
}

export default TopBar;
