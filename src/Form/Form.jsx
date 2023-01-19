import React, { Component } from 'react';
import { connect } from "react-redux";
import { actADDSV } from '../redux/reducers/user/action/action';

class FormSV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maSV: "",
            hoten: "",
            phone: "",
            email: "",
            errors: {
                maSV: "",
                hoten: "",
                phone: "",
                email: "",
            },
            formValid: false,
            masvValid: false,
            hotenValid: false,
            phoneValid: false,
            emailValid: false,
            stEdit: false,
        };
    }
    // lấy Form từ constructor
    handleOnChange = (word) => {
        const { name, value } = word.target;
        this.setState({
            [name]: value,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitSV(this.state);
        this.props.getSVEdit = {};
    }
    handleError = (word) => {
        const { name, value } = word.target;

        let mess = value.trim() === "" ? `(*) Vui lòng nhập ${name}` : "";

        let { masvValid, hotenValid, phoneValid, emailValid } = this.state;
        switch (name) {
            case "maSV":
                masvValid = mess === "" ? true : false;
                if (value && value.length < 3) {
                    mess = "Vui lòng nhập từ 3 ký tự trỡ lên"
                    masvValid = false;
                }
                if (!this.props.stEdit) {
                    const checkList = [...this.props.SVList];
                    checkList.map((sv) => {
                        if (sv.maSV === value) {
                            mess = "Mã Sinh Viên Bị Trùng"
                            masvValid = false;
                        };
                        return masvValid;
                    })
                }
                break;
            case "hoten":
                hotenValid = mess === "" ? true : false;
                break;
            case "phone":
                phoneValid = mess === "" ? true : false;
                break;
            case "email":
                emailValid = mess === "" ? true : false;
                if (value && !value.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")) {
                    mess = "Vui lòng nhập đúng định dạng mail"
                    masvValid = false;
                } else { masvValid = true; }
                break;
            default:
                break;
        }

        this.setState({
            errors: { ...this.state.errors, [name]: mess },
            masvValid,
            hotenValid,
            phoneValid,
            emailValid,
            formValid: masvValid && hotenValid && phoneValid && emailValid,
        }
            , () => { console.log(this.state) }
        )
    };
    UNSAFE_componentWillReceiveProps(nextprops) {
        console.log(nextprops.getSVEdit, this.props)
        if (this.props && nextprops.getSVEdit) {
            const { maSV, hoten, email, phone } = nextprops.getSVEdit;
            this.setState({
                maSV, hoten, email, phone,
                stEdit: true,
                formValid: true,
            });

        } else {
            this.setState({
                maSV: "",
                hoten: "",
                email: "",
                phone: "",
                stEdit: false,
                formValid: false,
                errors: {
                    maSV: "",
                    hoten: "",
                    phone: "",
                    email: "",
                },
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1 className="bg-dark text-white p-3">Thông tin sinh viên</h1>
                <div className='row'>
                    <div className="col-6 form-group">
                        <label htmlFor>Mã Sinh Viên</label>
                        <input type="text" className="form-control form-control-sm" id aria-describedby="helpId1" placeholder
                            onChange={this.handleOnChange}
                            name="maSV"
                            onBlur={this.handleError}
                            value={this.state.maSV}
                            disabled={this.state.stEdit}
                        />

                        {this.state.errors.maSV
                            && (<small id="helpId1" className="form-text text-red bg-danger">{this.state.errors.maSV}</small>)}
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor>Họ Tên</label>
                        <input type="text" className="form-control form-control-sm" id aria-describedby="helpId2" placeholder
                            onChange={this.handleOnChange}
                            name="hoten"
                            onBlur={this.handleError}
                            value={this.state.hoten}
                        />
                        {this.state.errors.hoten
                            && (<small id="helpId2" className="form-text text-red bg-danger">{this.state.errors.hoten}</small>)}
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor>Số Điện Thoại</label>
                        <input type="number" className="form-control form-control-sm" id aria-describedby="helpId3" placeholder
                            onChange={this.handleOnChange}
                            name="phone"
                            onBlur={this.handleError}
                            value={this.state.phone}
                        />
                        {this.state.errors.phone
                            && (<small id="helpId3" className="form-text text-red bg-danger">{this.state.errors.phone}</small>)}
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor>Email</label>
                        <input type='email' className="form-control form-control-sm" id aria-describedby="helpId4" placeholder
                            onChange={this.handleOnChange}
                            name="email"
                            onBlur={this.handleError}
                            value={this.state.email}
                        />
                        {this.state.errors.email
                            && (<small id="helpId4" className="form-text text-red bg-danger">{this.state.errors.email}</small>)}
                    </div>

                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!this.state.formValid}
                > {this.state.stEdit ? "UPDATA" : "Thêm Sinh Viên"}</button>
            </form >
        )
    }
}
const mapDispathchToProps = (dispatch) => {
    return {
        submitSV: (sv) => {
            dispatch(actADDSV(sv));
        },

    };
};
const mapStateToProps = (state) => {
    return {
        getSVEdit: state.userReducer.editSV,
        SVList: state.userReducer.SVList,
    };
};

export default connect(mapStateToProps, mapDispathchToProps)(FormSV);