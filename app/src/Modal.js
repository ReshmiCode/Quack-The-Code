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
    borderRadius: 15,
    width: 200,
    height: 40,
    border: "none",
    backgroundColor: "#d4eaf9",
  },
  button: {
    width: 90,
    height: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#5295c7",
    border: "none",
    color: "#07002c",
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
      <button style={styles.button} onClick={openModal}>
        Open Modal
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={styles}
        contentLabel="Example Modal"
      >
        <h2>Settings</h2>
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#ea9a90",
            border: "none",
            margin: 5,
          }}
          onClick={closeModal}
        >
          x
        </button>
        <label>
          <input
            style={styles.field}
            type="text"
            placeholder="   GitHub Username"
            value={props.user}
            onChange={props.changeUser}
          />
        </label>
        <button style={styles.button}>Save</button>
      </Modal>
    </div>
  );
}
