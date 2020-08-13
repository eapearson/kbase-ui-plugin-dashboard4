import React from 'react';

import './style.css';
import Widget from '../widget';
import { v4 as uuidv4 } from 'uuid';
import { NarrativesConfigProps } from '../narratives/types';
import NarrativesWidget from '../narratives';
import { JobsConfig } from '../jobs/types';
import JobsWidget from '../jobs';
import Spacer from '../grid/Spacer';
import Col from '../grid/Col';
import { WidgetLayout, Position } from '../../redux/store';
import WidgetWrapper from '../WidgetWrapper';
import { DropType } from '../../redux/actions';
import { Empty } from 'antd';

export interface DashboardProps {
    setTitle: (title: string) => void;
    widgetLayout: WidgetLayout;
    isDragging: boolean;
    addWidget: (widgetId: string, position: Position) => void;
    spacerSelected: (type: DropType, widgetId: string, position: Position) => void;
    dragStart: () => void;
    dragEnd: () => void;
}

// export type WidgetLayout = Array<Array<string | null>>;

export interface DashboardState {
    widgetInstances: WidgetInstances,
    // widgetLayout: WidgetLayout;
}

// interface Widget {
//     row: number;
//     col: number;
//     component: JSX.Element;
// }

enum WidgetType {
    NARRATIVES,
    YOUR_NARRATIVES,
    SHARED_NARRATIVES,
    PUBLIC_NARRATIVES,
    TUTORIAL_NARRATIVES,
    JOBS,
    ORGANIZATIONS
}

export enum WidgetView {
    FRONT,
    CONFIG,
    ABOUT
}

interface WidgetRegistration {
    type: WidgetType;
    id: string;
    props: any;
    // renderFront<ConfigType>: (config: ConfigType) => JSX.Element;
    // renderConfig: () => JSX.Element;
    // renderAbout: () => JSX.Element;
}

interface WidgetInstance {
    type: WidgetType;
    title: string;
    showDetail: boolean;
    selectedTab: string;
    props?: any;
    view: WidgetView;
    // id: string;
    // make: () => JSX.Element
}

export interface WidgetInstances {
    [x: string]: WidgetInstance;
}



export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
    widgets: Array<WidgetRegistration>;
    widgetRegistry: Map<WidgetType, WidgetRegistration>;
    constructor(props: DashboardProps) {
        super(props);

        // this.widgets = [
        //     [WidgetType.YOUR_NARRATIVES, WidgetType.SHARED_NARRATIVES, WidgetType.PUBLIC_NARRATIVES],
        //     [WidgetType.TUTORIAL_NARRATIVES, WidgetType.JOBS, WidgetType.ORGANIZATIONS]
        // ];

        this.widgets = [
            {
                id: 'narratives',
                type: WidgetType.NARRATIVES,
                props: {

                }
                // renderFront: () => {
                //     return <YourNarrativesCard />;
                // },
                // renderConfig: () => {
                //     return <div>Editor Here</div>;
                // },
                // renderAbout: () => {
                //     return <div>About here...</div>;
                // }
            },
            // {
            //     id: 'shared-narratives',
            //     type: WidgetType.SHARED_NARRATIVES,
            //     props: {
            //         isSharedWith: true
            //     }
            //     // renderFront: () => {
            //     //     return <SharedNarrativesCard />;
            //     // },
            //     // renderConfig: () => {
            //     //     return <div>Editor Here</div>;
            //     // },
            //     // renderAbout: () => {
            //     //     return <div>About here...</div>;
            //     // }
            // },
            // {
            //     id: 'public-narratives',
            //     type: WidgetType.PUBLIC_NARRATIVES,
            //     props: {
            //         isPublic: true,
            //         isNarratorial: false
            //     }
            //     // renderFront: () => {
            //     //     return <PublicNarratives />;
            //     // },
            //     // renderConfig: () => {
            //     //     return <div>Editor Here</div>;
            //     // },
            //     // renderAbout: () => {
            //     //     return <div>About here...</div>;
            //     // }
            // },
            // {
            //     id: 'tutorial-narratives',
            //     type: WidgetType.TUTORIAL_NARRATIVES,
            //     props: {
            //         isNarratorial: true
            //     }
            //     // renderFront: () => {
            //     //     return <TutorialNarrativesCard />;
            //     // },
            //     // renderConfig: () => {
            //     //     return <div>Editor Here</div>;
            //     // },
            //     // renderAbout: () => {
            //     //     return <div>About here...</div>;
            //     // }
            // },
            {
                id: 'jobs',
                type: WidgetType.JOBS,
                props: {}
            },
            // {
            //     id: 'organizations',
            //     type: WidgetType.ORGANIZATIONS,
            //     renderFront: () => {
            //         return <OrganizationsCard />;
            //     },
            //     renderConfig: () => {
            //         return <div>Config Editor Here</div>;
            //     },
            //     renderAbout: () => {
            //         return <div>About here...</div>;
            //     }
            // }
        ];
        this.widgetRegistry = new Map();
        this.widgets.forEach((widget) => {
            this.widgetRegistry.set(widget.type, widget);
        });

        const widgetInstances: WidgetInstances = {};
        // add narratives
        const myNarrativesID = uuidv4();
        widgetInstances[myNarrativesID] = {
            type: WidgetType.NARRATIVES,
            title: 'Your Narratives',
            showDetail: false,
            selectedTab: 'view',
            view: WidgetView.FRONT,
            props: {
                isOwn: true
            }
        };

        const publicNarrativesID = uuidv4();
        widgetInstances[publicNarrativesID] = {
            type: WidgetType.NARRATIVES,
            title: 'Public Narratives',
            showDetail: false,
            selectedTab: 'view',
            view: WidgetView.FRONT,
            props: {
                isPublic: true
            }
        };

        const sharedNarrativesID = uuidv4();
        widgetInstances[sharedNarrativesID] = {
            type: WidgetType.NARRATIVES,
            title: 'Narratives shared with you',
            showDetail: false,
            selectedTab: 'view',
            view: WidgetView.FRONT,
            props: {
                isOwn: false,
                isSharedWith: true
            }
        };

        const tutorialNarrativesID = uuidv4();
        widgetInstances[tutorialNarrativesID] = {
            type: WidgetType.NARRATIVES,
            title: 'Tutorial Narratives',
            showDetail: false,
            selectedTab: 'view',
            view: WidgetView.FRONT,
            props: {
                isNarratorial: true
            }
        };

        const jobsID = uuidv4();
        widgetInstances[jobsID] = {
            type: WidgetType.JOBS,
            title: 'Your Jobs',
            showDetail: false,
            selectedTab: 'view',
            view: WidgetView.FRONT,
            props: {

            }
        };

        // const orgsID = uuidv4();
        // widgetInstances[orgsID] = {
        //     type: WidgetType.ORGANIZATIONS,
        //     title: 'Organizations',
        //     showDetail: false,
        //     selectedTab: 'view'
        // };

        this.state = {
            widgetInstances,
            // widgetLayout: [
            //     [myNarrativesID, sharedNarrativesID, jobsID],
            //     [publicNarrativesID, tutorialNarrativesID, null]
            // ]
        };

        this.props.addWidget(myNarrativesID, { rowId: 0, colId: 0 });
        this.props.addWidget(sharedNarrativesID, { rowId: 0, colId: 1 });
        this.props.addWidget(jobsID, { rowId: 0, colId: 2 });
        this.props.addWidget(publicNarrativesID, { rowId: 1, colId: 0 });
        this.props.addWidget(tutorialNarrativesID, { rowId: 1, colId: 1 });


        // this.state = {
        //     widgetLayout: [
        //         [
        //             {
        //                 type: WidgetType.NARRATIVES,
        //                 title: 'Narratives',
        //                 showDetail: false,
        //                 selectedTab: 'view'
        //             },
        //             {
        //                 type: WidgetType.NARRATIVES,
        //                 title: 'Narratives',
        //                 showDetail: false,
        //                 selectedTab: 'view'
        //             },
        //             {
        //                 type: WidgetType.NARRATIVES,
        //                 title: 'Narratives',
        //                 showDetail: false,
        //                 selectedTab: 'view'
        //             }
        //         ],

        //         [
        //             {
        //                 type: WidgetType.YOUR_NARRATIVES,
        //                 title: 'Your Narratives',
        //                 showDetail: false,
        //                 selectedTab: 'view'
        //             },
        //             {
        //                 type: WidgetType.SHARED_NARRATIVES,
        //                 title: 'Shared Narratives',
        //                 showDetail: false,
        //                 selectedTab: 'view'
        //             }, {
        //                 type: WidgetType.PUBLIC_NARRATIVES,
        //                 title: 'Public Narratives',
        //                 showDetail: false,
        //                 selectedTab: 'view'
        //             }
        //         ], [
        //             {
        //                 type: WidgetType.TUTORIAL_NARRATIVES,
        //                 title: 'Tutorial Narratives',
        //                 showDetail: false,
        //                 selectedTab: 'view'
        //             },
        //             {
        //                 type: WidgetType.JOBS,
        //                 title: 'Jobs',
        //                 showDetail: false,
        //                 selectedTab: 'view'
        //             },
        //             {
        //                 type: WidgetType.ORGANIZATIONS,
        //                 title: 'Organizations',
        //                 showDetail: false,
        //                 selectedTab: 'view'
        //             }
        //         ]
        //     ]
        // };
        // this.widgetLayout = [
        //     [
        //         {
        //             type: WidgetType.YOUR_NARRATIVES,
        //             widget: <Widget render={() => {
        //                 return <YourNarrativesCard />
        //             }}
        //         }
        //     ]
        // ]

        // this.widgets = [
        //     {
        //         row: 1,
        //         col: 1,
        //         component: <YourNarrativesCard />
        //     },
        //     {
        //         row: 1,
        //         col: 2,
        //         component: <SharedNarrativesCard />
        //     },
        //     {
        //         row: 1,
        //         col: 3,
        //         component: <PublicNarratives />
        //     },
        //     {
        //         row: 2,
        //         col: 1,
        //         component: <TutorialNarrativesCard />
        //     },
        //     {
        //         row: 2,
        //         col: 2,
        //         component: <JobsCard />
        //     },
        //     {
        //         row: 2,
        //         col: 3,
        //         component: <OrganizationsCard />
        //     }
        // ];
    }

    componentDidMount() {
        this.props.setTitle('Dashboard the Fourth');
    }

    handleMoveRight(rowNumber: number, columnNumber: number) {
        const layout = this.props.widgetLayout;
        const row = layout[rowNumber];
        if (columnNumber >= row.length - 1) {
            return;
        }
        const col = row[columnNumber];
        row[columnNumber] = row[columnNumber + 1];
        row[columnNumber + 1] = col;
        // this.setState({
        //     widgetLayout: layout
        // });
    }

    handleMoveLeft(rowNumber: number, columnNumber: number) {
        const layout = this.props.widgetLayout;
        const row = layout[rowNumber];
        if (columnNumber === 0) {
            return;
        }
        const col = row[columnNumber];
        row[columnNumber] = row[columnNumber - 1];
        row[columnNumber - 1] = col;
        // this.setState({
        //     widgetLayout: layout
        // });
    }

    handleMoveUp(rowNumber: number, columnNumber: number) {
        const layout = this.props.widgetLayout;
        const fromRow = layout[rowNumber];
        if (rowNumber === 0) {
            return;
        }
        const col = fromRow[columnNumber];
        const toRow = layout[rowNumber - 1];
        fromRow[columnNumber] = toRow[columnNumber];
        toRow[columnNumber] = col;
        // this.setState({
        //     widgetLayout: layout
        // });
    }

    handleMoveDown(rowNumber: number, columnNumber: number) {
        const layout = this.props.widgetLayout;
        const fromRow = layout[rowNumber];
        if (rowNumber >= layout.length - 1) {
            return;
        }
        const col = fromRow[columnNumber];
        const toRow = layout[rowNumber + 1];
        fromRow[columnNumber] = toRow[columnNumber];
        toRow[columnNumber] = col;
        // this.setState({
        //     widgetLayout: layout
        // });
    }

    handleToggleDetail(rowID: number, colID: number) {
        const { widgetInstances } = this.state;
        const { widgetLayout } = this.props;
        const id = widgetLayout[rowID][colID];
        if (!id) {
            return;
        }
        const widgetInstance = this.state.widgetInstances[id];
        widgetInstance.showDetail = !widgetInstance.showDetail;
        if (!widgetInstance.showDetail) {
            widgetInstance.selectedTab = 'view';
            widgetInstance.view = WidgetView.FRONT;
        }
        widgetInstances[id] = widgetInstance;
        this.setState({ widgetInstances });
    }

    handleSelectTab(tab: string, rowID: number, colID: number) {
        const { widgetInstances } = this.state;
        const { widgetLayout } = this.props;
        const id = widgetLayout[rowID][colID];
        if (!id) {
            return;
        }
        const widgetInstance = this.state.widgetInstances[id];
        widgetInstance.selectedTab = tab;
        let view: WidgetView;
        switch (tab) {
            case 'view':
                view = WidgetView.FRONT;
                break;
            case 'config':
                view = WidgetView.CONFIG;
                break;
            case 'about':
                view = WidgetView.ABOUT;
                break;
            default:
                view = WidgetView.FRONT;
        }
        widgetInstance.view = view;
        widgetInstances[id] = widgetInstance;
        this.setState({ widgetInstances });
    }

    handleChangeConfig(config: NarrativesConfigProps) {
        console.log('updating...', config);
    }

    renderWidget(widgetDef: WidgetInstance, widget: WidgetRegistration | undefined, widgetId: string, rowID: number, colID: number) {
        if (!widget) {
            return <div>Unknown widget: {widgetDef.type}</div>;
        }
        let theWidget: JSX.Element;
        switch (widgetDef.type) {
            case WidgetType.NARRATIVES:
                {
                    const config = (widgetDef.props as unknown) as NarrativesConfigProps;
                    const view = widgetDef.view;
                    theWidget = <NarrativesWidget
                        view={view}
                        config={config}
                        onChangeConfig={this.handleChangeConfig.bind(this)}
                    />;
                }
                break;
            case WidgetType.JOBS:
                {
                    const config = (widgetDef.props as unknown) as JobsConfig;
                    const view = widgetDef.view;
                    theWidget = <JobsWidget view={view} config={config} />;
                }
                break;
            default:
                theWidget = <div>Sorry, no widget here</div>;
        }

        return <Widget
            id={widgetId}
            title={widgetDef.title}
            key={widgetDef.title}
            onMoveRight={() => {
                this.handleMoveRight(rowID, colID);
            }}
            onMoveLeft={() => {
                this.handleMoveLeft(rowID, colID);
            }}
            onMoveUp={() => {
                this.handleMoveUp(rowID, colID);
            }}
            onMoveDown={() => {
                this.handleMoveDown(rowID, colID);
            }}
            showDetail={widgetDef.showDetail}
            selectedTab={widgetDef.selectedTab}
            onToggleDetail={() => {
                this.handleToggleDetail(rowID, colID);
            }}
            onSelectTab={(tab: string) => {
                this.handleSelectTab(tab, rowID, colID);
            }}
            dragStart={this.props.dragStart}
            dragEnd={this.props.dragEnd}
        >
            {theWidget}
        </Widget>;
    }

    renderWidgetHeader(widget: WidgetInstance) {
        return <span>
            {widget.title}
        </span>;
    }

    onSpacerSelected(widgetId: string, position: Position) {
        this.props.spacerSelected('insert', widgetId, position);
    }

    onCellDrop(widgetId: string, position: Position) {
        this.props.spacerSelected('replace', widgetId, position);
    }

    renderSpacer(rowId: number, id: number) {
        return <Spacer rowId={rowId} id={id} onSpacerSelected={this.onSpacerSelected.bind(this)} key={`spacer,row:${rowId},col:${id}`} />;
    }

    renderCol(widgetId: string | null, rowID: number, columnID: number) {
        if (!widgetId) {
            return <Col id={columnID} key={`row:${rowID},col:${columnID}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <WidgetWrapper rowId={rowID} colId={columnID} widgetId={widgetId} onDrop={this.onCellDrop.bind(this)} isDragging={this.props.isDragging} />
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Col>;
        }
        const widgetInstance = this.state.widgetInstances[widgetId];
        const theWidget = this.widgetRegistry.get(widgetInstance.type);
        return <Col
            id={columnID}
            key={`row:${rowID},col:${columnID}`}
        >
            <WidgetWrapper rowId={rowID} colId={columnID} widgetId={widgetId} onDrop={this.onCellDrop.bind(this)} isDragging={this.props.isDragging} />
            {this.renderWidget(widgetInstance, theWidget, widgetId, rowID, columnID)}
        </Col>;
    }

    renderRow(row: Array<string | null>, rowID: number) {
        const result: Array<JSX.Element> = [];
        for (let i = 0; i < row.length; i += 1) {
            result.push(this.renderSpacer(rowID, i));
            result.push(this.renderCol(row[i], rowID, i));

        }
        result.push(this.renderSpacer(rowID, row.length));
        return result;

        // return this.interpolate(row.map((id, index) => {

        // }));
    }

    renderWidgets() {
        return this.props.widgetLayout.map((row, index) => {
            return <div className="GridRow" key={`row:${index}`}>
                {this.renderRow(row, index)}
            </div>;
        });
    }

    render() {
        return <div className="Grid">
            {this.renderWidgets()}
        </div>;
    }
}
