import Select from "react-select";
import PinOrange from "./asset/PinOrange.svg";
import PinRed from "./asset/PinRed.svg";
import PinBlack from "./asset/PinBlack.svg";
import PinYellow from "./asset/PinYellow.svg";
import PinGreen from "./asset/PinGreen.svg";
import PinWhale from "./asset/PinWhale.svg";
import PinBlue from "./asset/PinBlue.svg";
import PinPurple from "./asset/PinPurple.svg";
import PinSky from "./asset/PinSky.svg";
import PinPink from "./asset/PinPink.svg";

function SelectPin({ active }) {
  const options = [
    { value: "PinBlack", label: "color: black", image: PinBlack },
    { value: "PinRed", label: "color: red", image: PinRed },
    { value: "PinOrange", label: "color: orange", image: PinOrange },
    { value: "PinYellow", label: "color: yellow", image: PinYellow },
    { value: "PinGreen", label: "color: green", image: PinGreen },
    { value: "PinWhale", label: "color: whale", image: PinWhale },
    { value: "PinBlue", label: "color: blue", image: PinBlue },
    { value: "PinPurple", label: "color: purple", image: PinPurple },
    { value: "PinSky", label: "color: sky", image: PinSky },
    { value: "PinPink", label: "color: pink", image: PinPink },
  ];

  return (
    <div
      style={{ width: 250, position: "fixed", zIndex: 1, top: 10, left: 450 }}
    >
      <Select
        defaultValue={options[0]}
        options={options}
        formatOptionLabel={(item) => (
          <div>
            <img src={item.image} alt="not loaded..." />
            <span> {item.label}</span>
          </div>
        )}
        onChange={(e) => {
          active(e.image);
        }}
      />
    </div>
  );
}

export default SelectPin;
