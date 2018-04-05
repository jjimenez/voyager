import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import Form from 'react-jsonschema-form';
import {debounce} from 'throttle-debounce';
import {ActionHandler} from '../../actions';
import {SPEC_FIELD_NESTED_PROP_CHANGE, SpecEncodingAction} from '../../actions/shelf';
import {SCHEMA_OBJ, UISCHEMA_OBJ} from '../../models/property-editor';
import {ShelfFieldDef, ShelfId} from '../../models/shelf/spec';
import * as styles from './property-editor.scss';

export interface PropertyEditorProps extends ActionHandler<SpecEncodingAction> {
  prop: string;
  nestedProp: string;
  shelfId: ShelfId;
  fieldDef: ShelfFieldDef;
}

export interface PropertyEditorState {
  formData: any;
}

export class PropertyEditorBase extends React.PureComponent<PropertyEditorProps, PropertyEditorState> {
  constructor(props: PropertyEditorProps) {
    super(props);
    this.changeFieldProperty = this.changeFieldProperty.bind(this);
    this.changeFieldProperty = debounce(500, this.changeFieldProperty);
    this.state = {formData: {}};
  }

  public render() {
    const {prop, nestedProp, fieldDef} = this.props;
    let encodingKey = prop + "_" + nestedProp;
    if (fieldDef.type.toString() === "quantitative") {
      encodingKey += "_quantitative";
    }
    const schema = SCHEMA_OBJ[encodingKey];
    const uiSchema = UISCHEMA_OBJ[encodingKey];
    return (
      <div styleName="property-editor">
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={this.state.formData}
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
    this.setState({formData: result.formData});
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

