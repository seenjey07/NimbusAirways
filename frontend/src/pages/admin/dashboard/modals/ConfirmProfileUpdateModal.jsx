import React, { useState } from "react";

const ConfirmProfileUpdateModal = ({
  addAlert,
  setConfirmUpdateModalOpen,
  formValues,
  typedPassword,
  setTypedPassword,
  onConfirmUpdate,
}) => {
  const handleConfirm = (e) => {
    e.preventDefault();
    if (typedPassword === formValues.password) {
      onConfirmUpdate();
      setConfirmUpdateModalOpen(false);
    } else {
      addAlert("error", "Incorrect password. Please try again.");
    }
  };

  const handleCancel = () => {
    setConfirmUpdateModalOpen(false);
  };

  return (
    <dialog
      className="card-body bg-secondary rounded-xl"
      onSubmit={handleConfirm}
      style={{
        position: "fixed",
        top: "50%",
        right: "50%",
        left: "50%",
        bottom: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "80%",
        width: "500px",
      }}
    >
      <h2 className="text-sm bg-ghost font-bold text-center text-black my-2">
        Confirm profile update by typing your current password.
      </h2>
      <form className="flex flex-col gap-2">
        <input
          type="password"
          value={typedPassword}
          onChange={(e) => setTypedPassword(e.target.value)}
          className="place-self-center w-full input input-bordered h-8 max-w-xs mb-3 text-sm bg-white text-black"
        />
        <div className="flex justify-center gap-5">
          <button
            className="btn btn-neutral text-xs font-bold rounded-full"
            type="submit"
          >
            Confirm
          </button>
          <button
            className="btn btn-error text-xs font-bold  rounded-full"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ConfirmProfileUpdateModal;
