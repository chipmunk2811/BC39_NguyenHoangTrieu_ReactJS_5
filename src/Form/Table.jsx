import React, { Component } from 'react'
import { connect } from "react-redux";
import { actDelete, actKeyWord, actSVUser } from '../redux/reducers/user/action/action';

class Table extends Component {
    handleOnChange = (key) => {
        this.props.searchUser(key.target.value)
    }

    render() {

        let { SVList, keyWord } = this.props;
        // Search
        if (keyWord) {
            SVList = SVList.filter(sv => sv.hoten.toLocaleLowerCase().indexOf(keyWord.toLocaleLowerCase()) !== -1)
        };
        return (
            <>
                <br />
                <input type="text" className="form-control mb-3 w-50" onChange={this.handleOnChange} placeholder="Search Name" />
                <table className="table">
                    <thead>
                        <tr className='bg-dark text-white'>
                            <th>Mã SV</th>
                            <th>Họ Tên</th>
                            <th>Số Điện Thoại</th>
                            <th>Email</th>
                            <th>Custom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SVList.map((sv) => {
                            return < tr key={sv.maSV}>
                                <td>{sv.maSV}</td>
                                <td>{sv.hoten}</td>
                                <td>{sv.phone}</td>
                                <td>{sv.email}</td>
                                <td>
                                    <button type="button" className="btn btn-primary p-r-1"
                                        onClick={() => { this.props.getSVEdit(sv) }}>EDIT</button>
                                    <button type="button" className="btn btn-danger"
                                        onClick={() => { this.props.DeleteSV(sv.maSV) }}>DELETE</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </>
        )
    }
}
// Nhận giá trị từ redux
const mapStateToProps = (state) => {
    return {
        SVList: state.userReducer.SVList,
        keyWord: state.userReducer.keyWord,
    };
};
const mapDispathchToProps = (dispatch) => {
    return {
        DeleteSV: (maSV) => {
            dispatch(actDelete(maSV));
        },
        getSVEdit: (sv) => {
            dispatch(actSVUser(sv));
        },
        searchUser: (keyword) => {
            dispatch(actKeyWord(keyword));
        },
    };
};
export default connect(mapStateToProps, mapDispathchToProps)(Table);