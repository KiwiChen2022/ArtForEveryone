function ImageForm({ setName, setDescription, submitHandler }) {
  return (
    <form onSubmit={submitHandler}>
      <div>
        <p>
          <b>Create Your Image</b>
        </p>
        <input
          type="text"
          placeholder="Create a name..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <textarea
          placeholder="Create a description..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default ImageForm;
