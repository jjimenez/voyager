import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import Form from 'react-jsonschema-form';
import {ActionHandler} from '../../actions';
import {SPEC_FIELD_NESTED_PROP_CHANGE, SpecEncodingAction} from '../../actions/shelf';
import {
  AXIS_ORIENT_SCHEMA,
  AXIS_ORIENT_UISCHEMA,
  AXIS_TITLE_SCHEMA,
  AXIS_TITLE_UISCHEMA,
  COLOR_COLOR_SCHEMA,
  COLOR_COLOR_UISCHEMA,
  SCALE_RANGE_SCHEMA,
  SCALE_RANGE_UISCHEMA,
  SCALE_TYPE_SCHEMA,
  SCALE_TYPE_UISCHEMA, STACK_STACK_SCHEMA, STACK_STACK_UISCHEMA
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
      "color_fill": COLOR_COLOR_SCHEMA,
      "stack_stack": STACK_STACK_SCHEMA
    };

    const UISCHEMA_OBJ = {
      "scale_type": SCALE_TYPE_UISCHEMA,
      "scale_range": SCALE_RANGE_UISCHEMA,
      "axis_orient": AXIS_ORIENT_UISCHEMA,
      "axis_title": AXIS_TITLE_UISCHEMA,
      "color_fill": COLOR_COLOR_UISCHEMA,
      "stack_stack": STACK_STACK_UISCHEMA
    };

    const {prop, nestedProp} = this.props;
    const encodingKey = prop + "_" + nestedProp;
    const schema = SCHEMA_OBJ[encodingKey];
    const uiSchema = UISCHEMA_OBJ[encodingKey];
    return (
      <div styleName="property-editor">
        <Form
          schema={schema}
          uiSchema={uiSchema}
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

