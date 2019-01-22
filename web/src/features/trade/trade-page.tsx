import React, { Component } from 'react';
import { authenticate } from '../../shared/components/general/authenticate';
import { FullHeightVerticalContainer, Header, HorizontalContainer } from '../../shared/components/general';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Theme, createStyles, withStyles, Grid, Fab } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../shared/store';
import { PaddedContainer, ContainerWithDefaultMargins } from '../../shared/components/general/layout';
import { ColDef } from 'ag-grid-community';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme: Theme) => createStyles({
    listContainer: {
        height: 300,
        position: 'relative',
        border: 'solid 1px #cecece'
    },
    detailContainer: {
        margin: theme.spacing.unit,
        border: 'solid 1px #cecece'
    },
    searchContainer: {
        minHeight: '80px',
        border: 'solid 1px #cecece'
    },
    addTradeIcon: {
        position: 'absolute',
        right: -28,
        bottom: -28
    }
});


const tradeGridColumnDefs = [
    { headerName: 'Trade Date', field: 'date', width: 115 },
    { headerName: 'Commodity', field: 'commodityId', width: 118 },
    { headerName: 'Side', field: 'side', width: 76 },
    { headerName: 'Qty', field: 'quantity', width: 72 },
    { headerName: 'Price', field: 'price', width: 81 },
    { headerName: 'Counter Party', field: 'counterPartyName', width: 135 },
    { headerName: 'Location', field: 'locationId', width: 110 },
    { headerName: '', field: 'id', width: 100, cellRenderer: "deleteIconRenderer" }
];
const deleteTrade = (value: any, deleteTrade: Function) => {
    deleteTrade(value);
}
const frameworkComponents = {
    deleteIconRenderer: inject('rootStore')(({rootStore: { tradeStore }, value}: {rootStore: RootStore, value: any}) => {
        const deletTradeHandler = deleteTrade.bind(null, value, tradeStore.deleteTrade);
        return <DeleteIcon fontSize="small" onClick={deletTradeHandler}/>
    })
};
@inject('rootStore')
@observer
class TradePageBase extends Component<{rootStore: RootStore, classes: any }> {
    render() {
        const { classes, rootStore: { tradeStore } } = this.props;
        return (
            <Grid container>
                <Header/>
                <Grid container>
                    <Grid item xs={12} className={classes.searchContainer}>
                        Search
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8} className={classes.listContainer}>
                    <div 
                        className="ag-theme-balham">
                            <AgGridReact
                                columnDefs={tradeGridColumnDefs}
                                rowData={tradeStore.tradesRowData}
                                frameworkComponents={frameworkComponents}
                            >
                            </AgGridReact>
                    </div>
                    <Fab className={classes.addTradeIcon}>
                        <AddIcon/>
                    </Fab>
                </Grid>
                <Grid item xs={12} sm={4}>
                    
                </Grid>
            </Grid>
        )
    }
}

export const TradePage = authenticate(withStyles(styles)(TradePageBase));