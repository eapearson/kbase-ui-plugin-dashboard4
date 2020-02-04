import React from 'react';
import { Col, Row } from 'antd';
import YourNarrativesCard from '../yourNarratives';
import PublicNarratives from '../publicNarratives';
import SharedNarrativesCard from '../sharedNarratives';
import TutorialNarrativesCard from '../tutorialNarratives';
import JobsCard from '../jobs';
import OrganizationsCard from '../organizations';
import './style.css';
import Widget from '../widget';

export interface DashboardProps {
}

interface DashboardState {
    widgetLayout: Array<Array<WidgetInstance>>;
}

// interface Widget {
//     row: number;
//     col: number;
//     component: JSX.Element;
// }

enum WidgetType {
    YOUR_NARRATIVES = 0,
    SHARED_NARRATIVES,
    PUBLIC_NARRATIVES,
    TUTORIAL_NARRATIVES,
    JOBS,
    ORGANIZATIONS
}

interface WidgetRegistration {
    type: WidgetType;
    id: string;
    make: () => JSX.Element;
    renderConfig: () => JSX.Element;
    renderAbout: () => JSX.Element;
}

interface WidgetInstance {
    type: WidgetType;
    title: string;
    showDetail: boolean;
    selectedTab: string;
    // id: string;
    // make: () => JSX.Element
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
                id: 'your-narratives',
                type: WidgetType.YOUR_NARRATIVES,
                make: () => {
                    return <YourNarrativesCard />;
                },
                renderConfig: () => {
                    return <div>Editor Here</div>;
                },
                renderAbout: () => {
                    return <div>About here...</div>;
                }
            },
            {
                id: 'shared-narratives',
                type: WidgetType.SHARED_NARRATIVES,
                make: () => {
                    return <SharedNarrativesCard />;
                },
                renderConfig: () => {
                    return <div>Editor Here</div>;
                },
                renderAbout: () => {
                    return <div>About here...</div>;
                }
            },
            {
                id: 'public-narratives',
                type: WidgetType.PUBLIC_NARRATIVES,
                make: () => {
                    return <PublicNarratives />;
                },
                renderConfig: () => {
                    return <div>Editor Here</div>;
                },
                renderAbout: () => {
                    return <div>About here...</div>;
                }
            },
            {
                id: 'tutorial-narratives',
                type: WidgetType.TUTORIAL_NARRATIVES,
                make: () => {
                    return <TutorialNarrativesCard />;
                },
                renderConfig: () => {
                    return <div>Editor Here</div>;
                },
                renderAbout: () => {
                    return <div>About here...</div>;
                }
            },
            {
                id: 'jobs',
                type: WidgetType.JOBS,
                make: () => {
                    return <JobsCard />;
                },
                renderConfig: () => {
                    return <div>Config editor Here</div>;
                },
                renderAbout: () => {
                    return <div>About here...</div>;
                }
            },
            {
                id: 'organizations',
                type: WidgetType.ORGANIZATIONS,
                make: () => {
                    return <OrganizationsCard />;
                },
                renderConfig: () => {
                    return <div>Config Editor Here</div>;
                },
                renderAbout: () => {
                    return <div>About here...</div>;
                }
            }
        ];
        this.widgetRegistry = new Map();
        this.widgets.forEach((widget) => {
            this.widgetRegistry.set(widget.type, widget);
        });

        this.state = {
            widgetLayout: [
                [
                    {
                        type: WidgetType.YOUR_NARRATIVES,
                        title: 'Your Narratives',
                        showDetail: false,
                        selectedTab: 'view'
                    },
                    {
                        type: WidgetType.SHARED_NARRATIVES,
                        title: 'Shared Narratives',
                        showDetail: false,
                        selectedTab: 'view'
                    }, {
                        type: WidgetType.PUBLIC_NARRATIVES,
                        title: 'Public Narratives',
                        showDetail: false,
                        selectedTab: 'view'
                    }
                ], [
                    {
                        type: WidgetType.TUTORIAL_NARRATIVES,
                        title: 'Tutorial Narratives',
                        showDetail: false,
                        selectedTab: 'view'
                    },
                    {
                        type: WidgetType.JOBS,
                        title: 'Jobs',
                        showDetail: false,
                        selectedTab: 'view'
                    },
                    {
                        type: WidgetType.ORGANIZATIONS,
                        title: 'Organizations',
                        showDetail: false,
                        selectedTab: 'view'
                    }
                ]
            ]
        };
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

    handleMoveRight(rowNumber: number, columnNumber: number) {
        const layout = this.state.widgetLayout;
        const row = layout[rowNumber];
        if (columnNumber >= row.length - 1) {
            return;
        }
        const col = row[columnNumber];
        row[columnNumber] = row[columnNumber + 1];
        row[columnNumber + 1] = col;
        this.setState({
            widgetLayout: layout
        });
    }

    handleMoveLeft(rowNumber: number, columnNumber: number) {
        const layout = this.state.widgetLayout;
        const row = layout[rowNumber];
        if (columnNumber === 0) {
            return;
        }
        const col = row[columnNumber];
        row[columnNumber] = row[columnNumber - 1];
        row[columnNumber - 1] = col;
        this.setState({
            widgetLayout: layout
        });
    }

    handleMoveUp(rowNumber: number, columnNumber: number) {
        const layout = this.state.widgetLayout;
        const fromRow = layout[rowNumber];
        if (rowNumber === 0) {
            return;
        }
        const col = fromRow[columnNumber];
        const toRow = layout[rowNumber - 1];
        fromRow[columnNumber] = toRow[columnNumber];
        toRow[columnNumber] = col;
        this.setState({
            widgetLayout: layout
        });
    }

    handleMoveDown(rowNumber: number, columnNumber: number) {
        const layout = this.state.widgetLayout;
        const fromRow = layout[rowNumber];
        if (rowNumber >= layout.length - 1) {
            return;
        }
        const col = fromRow[columnNumber];
        const toRow = layout[rowNumber + 1];
        fromRow[columnNumber] = toRow[columnNumber];
        toRow[columnNumber] = col;
        this.setState({
            widgetLayout: layout
        });
    }

    handleToggleDetail(rowID: number, colID: number) {
        const widgetLayout = this.state.widgetLayout;
        const cell = widgetLayout[rowID][colID];
        cell.showDetail = !cell.showDetail;
        if (!cell.showDetail) {
            cell.selectedTab = 'view';
        }
        widgetLayout[rowID][colID] = cell;
        this.setState({ widgetLayout });
    }

    handleSelectTab(tab: string, rowID: number, colID: number) {
        const widgetLayout = this.state.widgetLayout;
        const cell = widgetLayout[rowID][colID];
        cell.selectedTab = tab;
        widgetLayout[rowID][colID] = cell;
        this.setState({ widgetLayout });
    }

    renderWidget(widgetDef: WidgetInstance, widget: WidgetRegistration | undefined, rowID: number, colID: number) {
        if (!widget) {
            return;
        }
        return <Widget
            title={widgetDef.title}
            key={widgetDef.title}
            renderConfig={widget.renderConfig}
            renderAbout={widget.renderAbout}
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
        >
            {widget.make()}
        </Widget>;
    }

    renderWidgetHeader(widget: WidgetInstance) {
        return <span>
            {widget.title}
        </span>;
    }

    renderRow(row: Array<WidgetInstance>, rowID: number) {
        return row.map((widgetDef, index) => {
            const theWidget = this.widgetRegistry.get(widgetDef.type);
            return <Col span={8} key={index}>
                {this.renderWidget(widgetDef, theWidget, rowID, index)}
            </Col>;
        });
    }

    renderWidgets() {
        return this.state.widgetLayout.map((row, index) => {
            return <Row key={index}>
                {this.renderRow(row, index)}
            </Row>;
        });
    }

    render() {
        return <div>
            {this.renderWidgets()}
        </div>;
    }
}
