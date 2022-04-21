class Collection extends Component {
  state = {
    collection: null,
  };
  handleCollection = (newCollection) => {
    this.setState({
      collection: newCollection,
    });
  };
  componentDidMount() {
    this._asyncRequest = this.getPromiseDev().then((newFirestoreCollection) => {
      this._asyncRequest = null;
      this.handleCollection(newFirestoreCollection);
    });
  }
  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  getPromiseDev() {
    return new Promise((resolve, reject) => {
      const db = getFirestore(appfirebase);
      const devsRef = collection(db, "devs");
      const q = query(
        devsRef,
        where("position", ">=", 1),
        orderBy("position", "asc")
      );
      let firestorecollections = [];
      const loadDevs = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let label = doc.get("label");
          let description = doc.get("description");
          firestorecollections.push({
            id: doc.id,
            name: label,
            info: description,
          });
        });
        resolve(firestorecollections);
      };
      loadDevs();
    });
  }
  render() {
    let { collection } = this.state;
    // Render loading state ...
    return (
      <div className="collectionContent">
        <div className="collection" id="targetCollection">
          {collection ? (
            collection.map((item) => {
              return <Document key={item.id} item={item} />;
            })
          ) : (
            <div className="loadgifdiv">
              <img src={loadgif} alt="loading..." />
            </div>
          )}
        </div>
      </div>
    );
  }
}
