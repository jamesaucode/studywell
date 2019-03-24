import React from "react";
import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import DropDownMenu from "../components/DropDownMenu";

Enzyme.configure({ adapter: new Adapter() });

describe("<DropDownMenu />", () => {
  it("showDropDown prop true correctly shows the dropdown content", () => {
    const wrapper = shallow(<DropDownMenu showDropDown={true} />);
    expect(wrapper.find("div.dropdown-content--show")).to.have.lengthOf(1);
  });

  it("Default showDropDown correctly hide the dropdown content", () => {
    const wrapper = shallow(<DropDownMenu />);
    expect(wrapper.find("div.dropdown-content--show")).to.have.lengthOf(0);
  });
});
