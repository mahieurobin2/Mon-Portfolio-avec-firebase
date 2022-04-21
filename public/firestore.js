class Document extends Component {
  state = {
    showInfo: false,
  };
  handleInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo,
    });
  };
  render() {
    let { name, info } = this.props.item;
    return (
      <div className="document">
        <h3>{name}</h3>
        <span className="infos" onClick={this.handleInfo}>
          <i className="fas fa-plus-circle">Voir plus</i>
        </span>
        {this.state.showInfo && (
          <div className="showInfos">
            <div className="infosContent">
              <div className="head">
                <h2>{name}</h2>
              </div>
              <p className="text">{info}</p>
              <div className="button return" onClick={this.handleInfo}>
                Retourner a la page
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
