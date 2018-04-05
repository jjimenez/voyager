import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs'; // eslint-disable-line
import {ActionHandler} from '../../actions';
import {SpecEncodingAction} from '../../actions/shelf';
import {ShelfFieldDef, ShelfId} from '../../models/shelf/spec';
import * as styles from './field-customizer.scss';
import {PropertyEditor} from './property-editor';

export interface FieldCustomizerProps extends ActionHandler<SpecEncodingAction> {
  shelfId: ShelfId;
  fieldDef: ShelfFieldDef;
}

export interface CustomProp {
  prop: string;
  nestedProp: string;
}

export class FieldCustomizerBase extends React.PureComponent<FieldCustomizerProps, {}> {
  private static channelEncodingMap() {
    // NOTE: Eventually can refactor nonQuantitative into temporal, nominal, ordinal, etc
    return {
      'position': {
        'quantitative': {
          'Common': [{prop: 'scale', nestedProp: 'type'},
            {prop: 'axis', nestedProp: 'title'}, {prop: 'stack', nestedProp: 'stack'}],
          'Scale': [{prop: 'scale', nestedProp: 'type'}],
          'Axis': [{prop: 'axis', nestedProp: 'orient'}, {prop: 'axis', nestedProp: 'title'}],
          'Stack': [{prop: 'stack', nestedProp: 'stack'}]
        },
        'nonQuantitative': {
          'Scale': [{prop: 'scale', nestedProp: 'type'}],
          'Axis': [{prop: 'axis', nestedProp: 'orient'}, {prop: 'axis', nestedProp: 'title'}],
        }
      },
      'mark': {
        'Color': [{prop: 'color', nestedProp: 'fill'}],
        'Shape': [{prop: 'shape', nestedProp: 'scale'}, {prop: 'shape', nestedProp: 'legend'}]
      }
    };
  }

  public render() {
    const {shelfId, handleAction, fieldDef} = this.props;
    const keys = Object.keys(this.getEncodingTypeForChannel());
    return (
      <div styleName='field-customizer'>
        <Tabs>
          <TabList className={'shit'}>
            {
              keys.map((encodingType, i) => {
                return (
                  <Tab key={i}>{encodingType}</Tab>
                );
              })
            }
          </TabList>
          <div>
            {
              keys.map((encodingType, i) => {
                const vals = this.getEncodingTypeForChannel()[encodingType] as CustomProp[];
                return (
                  <TabPanel key={encodingType + i}>
                    {
                      vals.map(customizableProp => {
                        const {prop, nestedProp} = customizableProp;
                        return (
                          <PropertyEditor
                            key={JSON.stringify({prop, nestedProp})}
                            prop={prop}
                            nestedProp={nestedProp}
                            shelfId={shelfId}
                            fieldDef={fieldDef}
                            handleAction={handleAction}
                          />
                        );
                      })
                    }
                  </TabPanel>
                );
              })}
          </div>
        </Tabs>
      </div>
    );
  }

  private getEncodingTypeForChannel() {
    const {shelfId, fieldDef} = this.props;
    const encodingMap = FieldCustomizerBase.channelEncodingMap();
    if (shelfId.channel.toString() === "x" || shelfId.channel.toString() === "y") {
      return fieldDef.type.toString() === "quantitative" ? encodingMap.position.quantitative :
        encodingMap.position.nonQuantitative;
    } else {
      return encodingMap.mark;
    }
  }
}

export const FieldCustomizer = CSSModules(FieldCustomizerBase, styles);
