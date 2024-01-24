import React, { forwardRef } from 'react';

// isTextArea : NewProject에서 Input Component를 호출하는데, isTextArea가 true라면 <textarea>가 렌더링된다.
const Input = forwardRef(({ label, isTextarea, ...props }, ref) => {
  const classes =
    'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600';

  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {isTextarea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} {...props} />
      )}
    </p>
  );
});

export default Input;
