import * as React from 'react';
import { Tree, ITreeNode } from '@blueprintjs/core';
import './Sidebar.scss';
import { Sf } from '../../services';
import { StoreUtils } from '../../store';
import { connect } from 'react-redux';

export interface SidebarProps {

}

export interface SidebarState {
    nodes: Array<ITreeNode>;
    reload?: boolean
}

export class SidebarClass extends React.Component<SidebarProps, SidebarState>
{

    /**
     *
     */
    constructor(props: SidebarProps) {
        super(props);
        this.state = {
            nodes: INITIAL_STATE,
            reload: true,
        }
    }


    public componentDidMount() {
        this.getInitialNodes();
    }

    public componentWillReceiveProps(nextProps: SidebarProps) {

        const selectedEmail = StoreUtils.getNewRecord(Sf.store.getState(), 'selected-email');
        if (selectedEmail && this.state.reload) {
            this.setState({ reload: false }, () => {
                this.getInitialNodes()
            })
        }
    }

    public render() {
        return (
            <Tree
                contents={this.state.nodes}
                onNodeClick={this.handleNodeClick}
                onNodeCollapse={this.handleNodeCollapse}
                onNodeExpand={this.handleNodeExpand}
                className={'sidebar full-height'}
            />
        )
    }

    private handleNodeClick = (nodeData: ITreeNode, _nodePath?: number[], e?: React.MouseEvent<HTMLElement>) => {
        const originallySelected = nodeData.isSelected;
        if (e && !e.shiftKey) {
            this.forEachNode(this.state.nodes, n => (n.isSelected = false));
        } else if (!e) {
            this.forEachNode(this.state.nodes, n => (n.isSelected = false));
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
        this.setState(this.state, () => {
            Sf.store.dispatch({
                type: 'Service_GetNewRecord_Success',
                object: 'emailType',
                record: nodeData.id
            });

            if (e) {
                Sf.store.dispatch({
                    type: 'Service_GetNewRecord_Success',
                    object: 'selected-email',
                    record: undefined
                });
            }

        });
    };

    private handleNodeCollapse = (nodeData: ITreeNode) => {
        nodeData.isExpanded = false;
        this.setState(this.state);
    };

    private handleNodeExpand = (nodeData: ITreeNode) => {
        nodeData.isExpanded = true;
        this.setState(this.state);
    };

    private forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
        if (nodes == null) {
            return;
        }
        const _messsages = StoreUtils.getNewRecord(Sf.store.getState(), 'inbox-emailList') || [];
        for (const node of nodes) {
            if (node.id === 'inbox') {
                if (_messsages.length > 0) {
                    const _count = _messsages.filter((y: any) => y.unread === true).length;
                    if (_count > 0) {
                        node.secondaryLabel = <div style={{ color: '#c7e0f4' }}>{_count}</div>
                    } else {
                        node.secondaryLabel = '';
                    }
                } else {
                    node.secondaryLabel = '';
                }

            }
            callback(node);
            if (node.childNodes) {
                this.forEachNode(node.childNodes, callback);
            }
        }
    }

    private getInitialNodes = () => {

        let selectedNode = StoreUtils.getNewRecord(Sf.store.getState(), 'emailType');
        if (!selectedNode) {
            selectedNode = 'inbox';
        }




        const nodeSelected = INITIAL_STATE[0].childNodes && INITIAL_STATE[0].childNodes.find((y: any) => y.id === selectedNode) as ITreeNode;
        if (nodeSelected) {
            nodeSelected.isSelected = false;
            this.handleNodeClick(nodeSelected as ITreeNode, undefined);
        }
    }
}

const Sidebar = connect((state: any) => { return { state }; }, null, null, {})(SidebarClass);
export { Sidebar };



const INITIAL_STATE: ITreeNode[] = [
    {
        id: 0,
        hasCaret: true,
        icon: "folder-close",
        label: "Folder",
        isExpanded: true,
        childNodes: [
            {
                id: 'inbox',
                icon: "inbox",
                label: "Inbox",

            },
            {
                id: 'junk',
                icon: 'disable',
                label: "Junk"
            },
            {
                id: 'drafts',
                icon: "edit",
                label: "Drafts",
            },
            {
                id: 'sent-items',
                icon: "send-message",
                label: "Sent Items",
            },
            {
                id: 'trash',
                icon: "trash",
                label: "Deleted Items",
            },
            {
                id: 'archive',
                icon: "archive",
                label: "Archive",
            },
        ],
    }
]