import React from 'react'

export default function Image() {
  return (
    <div className="h-[422px] flex-1 relative rounded-lg bg-gainsboro-200 min-w-[359px] max-w-full mq925:min-w-full" >
          <img
              className="relative rounded-lg max-w-full overflow-hidden max-h-full object-cover min-h-[422px] mq825:w-full"
              loading="lazy"
              alt=""
              src="/logo.png"
            />
    </div>
  )
}

