import React from "react";
import Modal from "react-modal";

const styles = {
  content: {
    top: "10%",
    left: "80%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  field: {
    borderRadius: 20,
    width: 200,
    height: 40,
    border: "none",
    backgroundColor: "#d4eaf9",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function App(props) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={styles}
        contentLabel="Example Modal"
      >
        <h2>Settings</h2>
        <button onClick={closeModal}>close</button>
        <label>
          <input
            style={styles.field}
            type="text"
            placeholder="GitHub User"
            value={props.user}
            onChange={props.changeUser}
          />
        </label>
        <button>Save User</button>
      </Modal>
    </div>
  );
}
