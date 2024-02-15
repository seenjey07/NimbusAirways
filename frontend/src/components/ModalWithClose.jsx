// eslint-disable-next-line react/prop-types
const ModalWithClose = ({ children }) => {
  return (
    <>
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {children}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ to close.</p>
        </div>
      </dialog>
    </>
  );
};

export default ModalWithClose;
