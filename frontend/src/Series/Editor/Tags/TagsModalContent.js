import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, kinds, sizes } from 'Helpers/Props';
import Label from 'Components/Label';
import Button from 'Components/Link/Button';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import styles from './TagsModalContent.css';
import translate from 'Utilities/String/translate';

class TagsModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      tags: [],
      applyTags: 'add'
    };
  }

  //
  // Lifecycle

  onInputChange = ({ name, value }) => {
    this.setState({ [name]: value });
  }

  onApplyTagsPress = () => {
    const {
      tags,
      applyTags
    } = this.state;

    this.props.onApplyTagsPress(tags, applyTags);
  }

  //
  // Render

  render() {
    const {
      seriesTags,
      tagList,
      onModalClose
    } = this.props;

    const {
      tags,
      applyTags
    } = this.state;

    const applyTagsOptions = [
      { key: 'add', value: translate('add') },
      { key: 'remove', value: translate('remove') },
      { key: 'replace', value: translate('replace') }
    ];

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('tags')}
        </ModalHeader>

        <ModalBody>
          <Form>
            <FormGroup>
              <FormLabel>{translate('tags')}</FormLabel>

              <FormInputGroup
                type={inputTypes.TAG}
                name="tags"
                value={tags}
                onChange={this.onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('applyTags')}</FormLabel>

              <FormInputGroup
                type={inputTypes.SELECT}
                name="applyTags"
                value={applyTags}
                values={applyTagsOptions}
                helpTexts={[
                  translate('applyTagsHelpTexts1'),
                  translate('applyTagsHelpTexts2'),
                  translate('applyTagsHelpTexts3'),
                  translate('applyTagsHelpTexts4')
                ]}
                onChange={this.onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('results')}</FormLabel>

              <div className={styles.result}>
                {
                  seriesTags.map((t) => {
                    const tag = _.find(tagList, { id: t });

                    if (!tag) {
                      return null;
                    }

                    const removeTag = (applyTags === 'remove' && tags.indexOf(t) > -1) ||
                        (applyTags === 'replace' && tags.indexOf(t) === -1);

                    return (
                      <Label
                        key={tag.id}
                        title={removeTag ? translate('removingTag') : translate('existingTag')}
                        kind={removeTag ? kinds.INVERSE : kinds.INFO}
                        size={sizes.LARGE}
                      >
                        {tag.label}
                      </Label>
                    );
                  })
                }

                {
                  (applyTags === 'add' || applyTags === 'replace') &&
                      tags.map((t) => {
                        const tag = _.find(tagList, { id: t });

                        if (!tag) {
                          return null;
                        }

                        if (seriesTags.indexOf(t) > -1) {
                          return null;
                        }

                        return (
                          <Label
                            key={tag.id}
                            title={translate('addingTag')}
                            kind={kinds.SUCCESS}
                            size={sizes.LARGE}
                          >
                            {tag.label}
                          </Label>
                        );
                      })
                }
              </div>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            {translate('cancel')}
          </Button>

          <Button
            kind={kinds.PRIMARY}
            onPress={this.onApplyTagsPress}
          >
            {translate('apply')}
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

TagsModalContent.propTypes = {
  seriesTags: PropTypes.arrayOf(PropTypes.number).isRequired,
  tagList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onModalClose: PropTypes.func.isRequired,
  onApplyTagsPress: PropTypes.func.isRequired
};

export default TagsModalContent;
