import React, {PropTypes} from 'react'

class DesignSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: props.display,
            Resource : props.Resource || {},
            onDesignChange: props.onDesignChange
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            display: nextProps.display,
            Resource : nextProps.Resource || this.state.Resource,
            onDesignChange: nextProps.onDesignChange || this.state.onDesignChange
        })
    }

    clickImage(designItem){
        console.log('clickImage')
        if(this.state.onDesignChange){
            this.state.onDesignChange(designItem)
        }
    }

    render() {
        console.log('DesignSelect::');
        console.log(this.state.Resource);
        let self = this
        let PreviewImages = []
        for(let key in this.state.Resource){
            let item = this.state.Resource[key]
            console.log(item)
            if(item['type'] === 'design'){
                if(item.previewImage){
                    PreviewImages.push(
                        <img key={item.previewImage.src} src={item.previewImage.src} style={{paddingTop: '5px'}} onClick={this.clickImage.bind(this, item)}/>
                    )
                }
            }
        }

        return (
            <div style={{position: 'absolute',top: '0',right: '0',bottom: '0',left: '0',background: 'rgba(0, 0, 0, 0.62)', display: (this.state.display?'block':'none')}}>
                    <div style={{width: '74%',height: '41%',position: 'absolute',left: '12%',top: '30%',background: 'white',
                        textAlign:'center', padding:'8px',overflow: 'scroll', borderRadius: '5px'}}>
                        {PreviewImages}
                    </div>
            </div>
        )

    }
}

export default DesignSelect;
