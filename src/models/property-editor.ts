import * as vlSchema from 'vega-lite/build/vega-lite-schema.json';

export const COLOR_COLOR_SCHEMA = {
  "type": "object",
  "title": "Color",
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
  "title": "Stack Offset",
  "properties": {
    "stackSelect": {
      "title": "Stack",
      "enum": (vlSchema as any).definitions.StackOffset.enum,
      "type": "string"
    }
  }
};

export const AXIS_TITLE_SCHEMA = {
  "type": "object",
  "title": "Axis Title",
  "properties": {
    "axisTitle": {
      "type": "string",
      "title": "Title"
    },
  },
};

export const AXIS_ORIENT_SCHEMA = {
  "type": "object",
  "title": "Axis Orient",
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
  "title": "Scale Range",
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
  "title": "Scale Type",
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
