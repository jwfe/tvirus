import { Component, PropTypes } from '@Libs';

export default class Icon extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        className: PropTypes.string,
        spin: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        spin: false,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { type, spin, ...otherProps } = this.props;

        return <i 
        style={this.style()}
        className={this.className('tv-icon', `tv-icon-${type}`, {
            'tv-icon-spin': spin
        })} {...otherProps} />;
    }
}