function SwitchButton({ label, onChange, checked }) {
  return (
    <label className="switch">
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span className="slider round"></span>
      {label}
    </label>
  );
}

export default SwitchButton;
