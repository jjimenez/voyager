import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import Form from 'react-jsonschema-form';
import {ActionHandler} from '../../actions';
import {SPEC_FIELD_NESTED_PROP_CHANGE, SpecEncodingAction} from '../../actions/shelf';
import {
  AXIS_ORIENT_SCHEMA, AXIS_ORIENT_UISCHEMA, AXIS_TITLE_SCHEMA, AXIS_TITLE_UISCHEMA,
  SCALE_RANGE_SCHEMA,
  SCALE_RANGE_UISCHEMA,
  SCALE_TYPE_SCHEMA,
  SCALE_TYPE_UISCHEMA
} from '../../models/property-editor';
import {ShelfFieldDef, ShelfId} from '../../models/shelf/spec';
import * as styles from './property-editor.scss';

export interface PropertyEditorProps extends ActionHandler<SpecEncodingAction> {
  prop: string;
  nestedProp: string;
  shelfId: ShelfId;
  fieldDef: ShelfFieldDef;
}

export class PropertyEditorBase extends React.PureComponent<PropertyEditorProps, {}> {
  constructor(props: PropertyEditorProps) {
    super(props);
    this.changeFieldProperty = this.changeFieldProperty.bind(this);
  }

  public render() {
    const SCHEMA_OBJ = {
      "scale_type": SCALE_TYPE_SCHEMA,
      "scale_range": SCALE_RANGE_SCHEMA,
      "axis_orient": AXIS_ORIENT_SCHEMA,
      "axis_title": AXIS_TITLE_SCHEMA,
    };

    const UISCHEMA_OBJ = {
      "scale_type": SCALE_TYPE_UISCHEMA,
      "scale_range": SCALE_RANGE_UISCHEMA,
      "axis_orient": AXIS_ORIENT_UISCHEMA,
      "axis_title": AXIS_TITLE_UISCHEMA
    };

    const {prop, nestedProp} = this.props;
    const key = prop + "_" + nestedProp;
    const jSchema = SCHEMA_OBJ[key];
    const uiSchema2 = UISCHEMA_OBJ[key];
    return (
      <div styleName="property-editor">
        <Form
          schema={jSchema}
          uiSchema={uiSchema2}
          onChange={this.changeFieldProperty}
        >
          <button type="submit" style={{display: 'none'}}>Submit</button>
          {/* hide required submit button */}
        </Form>
      </div>
    );
  }

  protected changeFieldProperty(result: any) {
    const {prop, nestedProp, shelfId, handleAction} = this.props;
    const value = result.formData[Object.keys(result.formData)[0]];
    handleAction({
      type: SPEC_FIELD_NESTED_PROP_CHANGE,
      payload: {
        shelfId,
        prop,
        nestedProp,
        value
      }
    });
  }
}

export const PropertyEditor = CSSModules(PropertyEditorBase, styles);

