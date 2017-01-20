'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('/data/zeit/next.js/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('/data/zeit/next.js/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('/data/zeit/next.js/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('/data/zeit/next.js/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('/data/zeit/next.js/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('/data/zeit/next.js/node_modules/styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('/data/zeit/next.js/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _head = require('/data/zeit/next.js/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = function (_React$Component) {
  (0, _inherits3.default)(Error, _React$Component);

  function Error() {
    (0, _classCallCheck3.default)(this, Error);
    return (0, _possibleConstructorReturn3.default)(this, (Error.__proto__ || (0, _getPrototypeOf2.default)(Error)).apply(this, arguments));
  }

  (0, _createClass3.default)(Error, [{
    key: 'render',
    value: function render() {
      var statusCode = this.props.statusCode;

      var title = statusCode === 404 ? 'This page could not be found' : statusCode ? 'Internal Server Error' : 'An unexpected error has occurred';

      return _react2.default.createElement(
        'div',
        { className: 'error', 'data-jsx': 676398231
        },
        _react2.default.createElement(
          _head2.default,
          null,
          _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0', 'data-jsx': 676398231
          })
        ),
        _react2.default.createElement(
          'div',
          {
            'data-jsx': 676398231
          },
          statusCode ? _react2.default.createElement(
            'h1',
            {
              'data-jsx': 676398231
            },
            statusCode
          ) : null,
          _react2.default.createElement(
            'div',
            { className: 'desc', 'data-jsx': 676398231
            },
            _react2.default.createElement(
              'h2',
              {
                'data-jsx': 676398231
              },
              title,
              '.'
            )
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: 3608526279,
          css: '\n        body { margin: 0 }\n      '
        }),
        _react2.default.createElement(_style2.default, {
          styleId: 965400277,
          css: '.error[data-jsx="676398231"] {color: #000;background: #fff;font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;height: 100vh;text-align: center;display:-webkit-flex; display:flex;-webkit-flex-direction: column;-moz-flex-direction: column;flex-direction: column;align-items: center;justify-content: center;}.desc[data-jsx="676398231"] {display: inline-block;text-align: left;line-height: 49px;height: 49px;vertical-align: middle;}h1[data-jsx="676398231"] {display: inline-block;border-right: 1px solid rgba(0, 0, 0,.3);margin: 0;margin-right: 20px;padding: 10px 23px 10px 0;font-size: 24px;font-weight: 500;vertical-align: top;}h2[data-jsx="676398231"] {font-size: 14px;font-weight: normal;margin: 0;padding: 0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3plaXQvbmV4dC5qcy9kaXN0L3BhZ2VzL19lcnJvci5qcz9lbnRyeSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0QmtCLEFBQ0YsOEJBQ00sWUFDSyxpQkFDc0gsdUlBQ3pILGNBQ0ssbUJBQ0wsbUNBQ1Msa0ZBQ0gsb0JBQ0ksd0JBQ3pCLENBRU0sNkJBQ2lCLHNCQUNMLGlCQUNDLGtCQUNMLGFBQ1UsdUJBQ3hCLENBRUcsMEJBQ29CLHNCQUNtQix5Q0FDL0IsVUFDUyxtQkFDTywwQkFDVixnQkFDQyxpQkFDRyxvQkFDckIsQ0FFRywwQkFDYyxnQkFDSSxvQkFDVixVQUNDLFdBQ1oiLCJmaWxlIjoiLi4vLi4vemVpdC9uZXh0LmpzL2Rpc3QvcGFnZXMvX2Vycm9yLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9kYXRhL3Byb2plY3RzL2NvdXJzZWJvb2stdWkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldEluaXRpYWxQcm9wcyAoeyByZXMsIHhociB9KSB7XG4gICAgY29uc3Qgc3RhdHVzQ29kZSA9IHJlcyA/IHJlcy5zdGF0dXNDb2RlIDogKHhociA/IHhoci5zdGF0dXMgOiBudWxsKVxuICAgIHJldHVybiB7IHN0YXR1c0NvZGUgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB0aXRsZSA9IHN0YXR1c0NvZGUgPT09IDQwNFxuICAgICAgPyAnVGhpcyBwYWdlIGNvdWxkIG5vdCBiZSBmb3VuZCdcbiAgICAgIDogKHN0YXR1c0NvZGUgPyAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyA6ICdBbiB1bmV4cGVjdGVkIGVycm9yIGhhcyBvY2N1cnJlZCcpXG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J2Vycm9yJz5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8bWV0YSBuYW1lPSd2aWV3cG9ydCcgY29udGVudD0nd2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCcgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxkaXY+XG4gICAgICAgIHtzdGF0dXNDb2RlID8gPGgxPntzdGF0dXNDb2RlfTwvaDE+IDogbnVsbH1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Rlc2MnPlxuICAgICAgICAgIDxoMj57dGl0bGV9LjwvaDI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICBib2R5IHsgbWFyZ2luOiAwIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLmVycm9yIHtcbiAgICAgICAgICBjb2xvcjogIzAwMDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFJvYm90bywgXCJTZWdvZSBVSVwiLCBcIkZpcmEgU2Fuc1wiLCBBdmVuaXIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJMdWNpZGEgR3JhbmRlXCIsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuZGVzYyB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDQ5cHg7XG4gICAgICAgICAgaGVpZ2h0OiA0OXB4O1xuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIH1cblxuICAgICAgICBoMSB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwuMyk7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgICAgICAgICBwYWRkaW5nOiAxMHB4IDIzcHggMTBweCAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgIH1cblxuICAgICAgICBoMiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgfVxufVxuIl19 */\n/*@ sourceURL=../../zeit/next.js/dist/pages/_error.js?entry */'
        })
      );
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var res = _ref.res,
          xhr = _ref.xhr;

      var statusCode = res ? res.statusCode : xhr ? xhr.status : null;
      return { statusCode: statusCode };
    }
  }]);
  return Error;
}(_react2.default.Component);

exports.default = Error;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3plaXQvbmV4dC5qcy9kaXN0L3BhZ2VzL19lcnJvci5qcz9lbnRyeSJdLCJuYW1lcyI6WyJFcnJvciIsInN0YXR1c0NvZGUiLCJwcm9wcyIsInRpdGxlIiwicmVzIiwieGhyIiwic3RhdHVzIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7NkJBTVQ7QUFBQSxVQUNBQyxVQURBLEdBQ2UsS0FBS0MsS0FEcEIsQ0FDQUQsVUFEQTs7QUFFUixVQUFNRSxRQUFRRixlQUFlLEdBQWYsR0FDViw4QkFEVSxHQUVUQSxhQUFhLHVCQUFiLEdBQXVDLGtDQUY1Qzs7QUFJQSxhQUFPO0FBQUE7QUFBQSxVQUFLLFdBQVUsT0FBZjtBQUFBO0FBQ0w7QUFBQTtBQUFBO0FBQ0Usa0RBQU0sTUFBSyxVQUFYLEVBQXNCLFNBQVEsdUNBQTlCO0FBQUE7QUFERixTQURLO0FBSUw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNHQSx1QkFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUtBO0FBQUwsV0FBYixHQUFxQyxJQUR4QztBQUVFO0FBQUE7QUFBQSxjQUFLLFdBQVUsTUFBZjtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFLRSxtQkFBTDtBQUFBO0FBQUE7QUFERjtBQUZGLFNBSks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBUDtBQXFERDs7OzBDQWhFcUM7QUFBQSxVQUFaQyxHQUFZLFFBQVpBLEdBQVk7QUFBQSxVQUFQQyxHQUFPLFFBQVBBLEdBQU87O0FBQ3BDLFVBQU1KLGFBQWFHLE1BQU1BLElBQUlILFVBQVYsR0FBd0JJLE1BQU1BLElBQUlDLE1BQVYsR0FBbUIsSUFBOUQ7QUFDQSxhQUFPLEVBQUVMLHNCQUFGLEVBQVA7QUFDRDs7O0VBSmdDLGdCQUFNTSxTOztrQkFBcEJQLEsiLCJmaWxlIjoiX2Vycm9yLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9kYXRhL3Byb2plY3RzL2NvdXJzZWJvb2stdWkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldEluaXRpYWxQcm9wcyAoeyByZXMsIHhociB9KSB7XG4gICAgY29uc3Qgc3RhdHVzQ29kZSA9IHJlcyA/IHJlcy5zdGF0dXNDb2RlIDogKHhociA/IHhoci5zdGF0dXMgOiBudWxsKVxuICAgIHJldHVybiB7IHN0YXR1c0NvZGUgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB0aXRsZSA9IHN0YXR1c0NvZGUgPT09IDQwNFxuICAgICAgPyAnVGhpcyBwYWdlIGNvdWxkIG5vdCBiZSBmb3VuZCdcbiAgICAgIDogKHN0YXR1c0NvZGUgPyAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyA6ICdBbiB1bmV4cGVjdGVkIGVycm9yIGhhcyBvY2N1cnJlZCcpXG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J2Vycm9yJz5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8bWV0YSBuYW1lPSd2aWV3cG9ydCcgY29udGVudD0nd2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCcgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxkaXY+XG4gICAgICAgIHtzdGF0dXNDb2RlID8gPGgxPntzdGF0dXNDb2RlfTwvaDE+IDogbnVsbH1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Rlc2MnPlxuICAgICAgICAgIDxoMj57dGl0bGV9LjwvaDI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICBib2R5IHsgbWFyZ2luOiAwIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLmVycm9yIHtcbiAgICAgICAgICBjb2xvcjogIzAwMDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFJvYm90bywgXCJTZWdvZSBVSVwiLCBcIkZpcmEgU2Fuc1wiLCBBdmVuaXIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJMdWNpZGEgR3JhbmRlXCIsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuZGVzYyB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDQ5cHg7XG4gICAgICAgICAgaGVpZ2h0OiA0OXB4O1xuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIH1cblxuICAgICAgICBoMSB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwuMyk7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgICAgICAgICBwYWRkaW5nOiAxMHB4IDIzcHggMTBweCAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgIH1cblxuICAgICAgICBoMiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgfVxufVxuIl19