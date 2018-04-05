import * as vlSchema from 'vega-lite/build/vega-lite-schema.json';

export const COLOR_COLOR_SCHEMA = {
  "type": "object",
  "properties": {
    "colorPicker": {
      "type": "string",
      "title": "Color",
      "default": "#4682b4"
    }
  }
};

export const STACK_STACK_SCHEMA = {
  "type": "object",
  "title": "Stack",
  "properties": {
    "stackSelect": {
      "title": "Offset",
      "enum": (vlSchema as any).definitions.StackOffset.enum,
      "type": "string"
    }
  }
};

export const AXIS_TITLE_SCHEMA = {
  "type": "object",
  "title": "Axis",
  "properties": {
    "axisTitle": {
      "type": "string",
      "title": "Title"
    },
  },
};

export const AXIS_ORIENT_SCHEMA = {
  "type": "object",
  "title": "Axis",
  "properties": {
    "orient": {
      "title": "Orient",
      "enum": (vlSchema as any).definitions.AxisOrient.enum,
      "type": "string"
    }
  }
};

export const SCALE_RANGE_SCHEMA = {
  "type": "object",
  "title": "Scale",
  "properties": {
    "integerRange": {
      "title": "Range",
      "type": "integer",
      "minimum": 0,
      "maximum": 100
    },
  },
};

export const SCALE_TYPE_SCHEMA = {
  "type": "object",
  "title": "Scale",
  "properties": {
    "scaleTypeSelect": {
      "title": "Type",
      "enum": (vlSchema as any).definitions.ScaleType.enum,
      "type": "string"
    },
  },
};

export const COLOR_COLOR_UISCHEMA = {
  "colorPicker": {
    "ui:widget": "color"
  }
};

export const AXIS_TITLE_UISCHEMA = {
  "axisTitle": {
    "ui:autofocus": true,
    "ui:emptyValue": ""
  }
};

export const AXIS_ORIENT_UISCHEMA = {
  "orient": {
    "ui:widget": "select",
    "ui:placeholder": "auto",
    "ui:emptyValue": "auto"
  }
}

export const SCALE_RANGE_UISCHEMA = {
  "integerRange": {
    "ui:widget": "range"
  },
};

export const SCALE_TYPE_UISCHEMA = {
  "scaleTypeSelect": {
    "ui:widget": "select",
    "ui:placeholder": "auto",
    "ui:emptyValue": "auto"
  },
};

export const STACK_STACK_UISCHEMA = {
  "stackSelect": {
    "ui:widget": "select",
    "ui:placeholder": "auto",
    "ui:emptyValue": "auto"
  }
};

export const SCHEMA_OBJ = {
  "scale_type_quantitative": SCALE_TYPE_SCHEMA,
  "axis_orient_quantitative": AXIS_ORIENT_SCHEMA,
  "axis_title_quantitative": AXIS_TITLE_SCHEMA,
  "color_fill_quantitative": COLOR_COLOR_SCHEMA,
  "stack_stack_quantitative": STACK_STACK_SCHEMA,
  "axis_orient": AXIS_ORIENT_SCHEMA,
  "axis_title": AXIS_TITLE_SCHEMA,
  "scale_type": SCALE_TYPE_SCHEMA
};

export const UISCHEMA_OBJ = {
  "scale_type_quantitative": SCALE_TYPE_UISCHEMA,
  "axis_orient_quantitative": AXIS_ORIENT_UISCHEMA,
  "axis_title_quantitative": AXIS_TITLE_UISCHEMA,
  "color_fill_quantitative": COLOR_COLOR_UISCHEMA,
  "stack_stack_quantitative": STACK_STACK_UISCHEMA,
  "axis_orient": AXIS_ORIENT_UISCHEMA,
  "axis_title": AXIS_TITLE_UISCHEMA,
  "scale_type": SCALE_TYPE_UISCHEMA
};
